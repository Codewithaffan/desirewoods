import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { title, description, imageBase64, imagesBase64 } = await req.json();

    if (!title) {
      return Response.json({ error: "title is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("desirewoods");

    const update = {
      title: title.trim(),
      description: (description || "").trim(),
    };

    const imagesToUpload = imagesBase64 && imagesBase64.length > 0
      ? imagesBase64
      : imageBase64 ? [imageBase64] : [];

    if (imagesToUpload.length > 0) {
      const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

      const uploadedImages = await Promise.all(
        imagesToUpload.map((img) =>
          cloudinary.uploader.upload(img, {
            folder: "desirewoods/products",
          })
        )
      );

      const imageUrls = uploadedImages.map((r) => r.secure_url);
      const cloudinaryIds = uploadedImages.map((r) => r.public_id);

      update.imageUrl = imageUrls[0];
      update.cloudinaryId = cloudinaryIds[0];
      update.imageUrls = imageUrls;
      update.cloudinaryIds = cloudinaryIds;

      // Delete old images
      const oldIds = product?.cloudinaryIds || (product?.cloudinaryId ? [product.cloudinaryId] : []);
      for (const cid of oldIds) {
        try { await cloudinary.uploader.destroy(cid); } catch (_) {}
      }
    }

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("desirewoods");

    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    // Delete all associated Cloudinary images
    const idsToDelete = product.cloudinaryIds || (product.cloudinaryId ? [product.cloudinaryId] : []);
    for (const cid of idsToDelete) {
      try { await cloudinary.uploader.destroy(cid); } catch (_) {}
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
