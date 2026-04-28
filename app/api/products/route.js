import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const id = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("desirewoods");

    if (id) {
      const { ObjectId } = await import("mongodb");
      const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
      if (!product) return Response.json({ error: "Not found" }, { status: 404 });
      return Response.json({
        ...product,
        _id: product._id.toString(),
        createdAt: product.createdAt ? product.createdAt.toISOString() : null,
      });
    }

    const filter = category ? { category } : {};
    const products = await db
      .collection("products")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt ? p.createdAt.toISOString() : null,
    }));

    return Response.json(serialized);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, description, category, imageBase64, imagesBase64 } = await req.json();

    if (!title || !category) {
      return Response.json(
        { error: "title and category are required" },
        { status: 400 }
      );
    }

    // Support multiple images (imagesBase64 array) or single (imageBase64)
    const imagesToUpload = imagesBase64 && imagesBase64.length > 0
      ? imagesBase64
      : imageBase64 ? [imageBase64] : [];

    if (imagesToUpload.length === 0) {
      return Response.json({ error: "At least one image is required" }, { status: 400 });
    }

    // Upload all images to Cloudinary
    const uploadedImages = await Promise.all(
      imagesToUpload.map((img) =>
        cloudinary.uploader.upload(img, {
          folder: "desirewoods/products",
          resource_type: "auto",
        })
      )
    );

    const imageUrls = uploadedImages.map((r) => r.secure_url);
    const cloudinaryIds = uploadedImages.map((r) => r.public_id);

    const client = await clientPromise;
    const db = client.db("desirewoods");

    const doc = {
      title: title.trim(),
      description: (description || "").trim(),
      category,
      // Keep imageUrl (first image) for backwards compatibility
      imageUrl: imageUrls[0],
      cloudinaryId: cloudinaryIds[0],
      // New: array of all images
      imageUrls: imageUrls,
      cloudinaryIds: cloudinaryIds,
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(doc);
    return Response.json({ success: true, id: result.insertedId.toString() });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
