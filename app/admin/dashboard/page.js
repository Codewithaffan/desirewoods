'use client'

import { useState, useEffect } from "react"

const CATEGORIES = [
  { value: "modular-kitchen",     label: "Modular Kitchen" },
  { value: "wardrobes",           label: "Wardrobes" },
  { value: "beds",                label: "Beds" },
  { value: "sofas",               label: "Sofas" },
  { value: "dining-table",        label: "Dining Table" },
  { value: "glass-partition",     label: "Glass Partition" },
  { value: "office-furniture",    label: "Office Furniture" },
  { value: "swing",               label: "Swing" },
  { value: "dining-chair",        label: "Dining Chair" },
  { value: "center-table",        label: "Center Table" },
  { value: "arm-chair",           label: "Arm Chair" },
  { value: "high-counter-chairs", label: "High Counter Chairs" },
]

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const MOBILE_STYLE = `
  @media (max-width: 768px) {
    .t-muted   { color: #555 !important; }
    .t-sub     { color: #444 !important; }
    .t-hint    { color: #666 !important; }
    .t-label   { color: #333 !important; }
    .t-muted, .t-sub, .t-hint { font-size: 13px !important; }
    .card-desc { color: #444 !important; font-size: 13px !important; }
    .section-sub { color: #444 !important; font-size: 13px !important; }
    .tab-inactive { color: #555 !important; }
    .header-label { color: #bbb !important; }
    .input-helper { color: #666 !important; font-size: 12px !important; }
    .auth-footer { color: #888 !important; }
    .msg-body { font-size: 13px !important; }
    .stat-pill { color: #b8822a !important; font-size: 12px !important; }
  }
`

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput]     = useState("")
  const [authError, setAuthError]             = useState("")
  const [tab, setTab]                         = useState("add")

  const [title, setTitle]             = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles]             = useState([])
  const [previews, setPreviews]       = useState([])
  const [category, setCategory]       = useState("wardrobes")
  const [loading, setLoading]         = useState(false)
  const [success, setSuccess]         = useState(false)
  const [addError, setAddError]       = useState("")

  const [manageCategory, setManageCategory]     = useState("wardrobes")
  const [products, setProducts]                 = useState([])
  const [fetchingProducts, setFetchingProducts] = useState(false)
  const [fetchError, setFetchError]             = useState("")

  const [editingProduct, setEditingProduct]     = useState(null)
  const [editTitle, setEditTitle]               = useState("")
  const [editDescription, setEditDescription]   = useState("")
  const [editFiles, setEditFiles]               = useState([])
  const [editPreviews, setEditPreviews]         = useState([])
  const [editLoading, setEditLoading]           = useState(false)
  const [editError, setEditError]               = useState("")

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth === "true") setIsAuthenticated(true)
  }, [])

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordInput === "Ahmed@123") {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin_auth", "true")
      setAuthError(""); setPasswordInput("")
    } else {
      setAuthError("Incorrect password"); setPasswordInput("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_auth")
  }

  const handleFilesChange = (e, isEdit = false) => {
    const selected = Array.from(e.target.files)
    if (!selected.length) return
    const newPreviews = selected.map(f => URL.createObjectURL(f))
    if (isEdit) { setEditFiles(selected); setEditPreviews(newPreviews) }
    else        { setFiles(selected);     setPreviews(newPreviews) }
  }

  const removePreview = (index, isEdit = false) => {
    if (isEdit) {
      setEditFiles(prev => prev.filter((_, i) => i !== index))
      setEditPreviews(prev => prev.filter((_, i) => i !== index))
    } else {
      setFiles(prev => prev.filter((_, i) => i !== index))
      setPreviews(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleUpload = async () => {
    setAddError("")
    if (!title.trim() || files.length === 0) { setAddError("Please fill in the title and select at least one image."); return }
    try {
      setLoading(true)
      const imagesBase64 = await Promise.all(files.map(f => fileToBase64(f)))
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), category, imagesBase64 }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || "Upload failed")
      setSuccess(true); setTitle(""); setDescription(""); setFiles([]); setPreviews([])
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      setAddError(err.message || "Upload failed. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async (cat) => {
    setFetchingProducts(true); setFetchError("")
    try {
      const res  = await fetch(`/api/products?category=${encodeURIComponent(cat)}`)
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || "Fetch failed")
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      setFetchError(err.message); setProducts([])
    } finally {
      setFetchingProducts(false)
    }
  }

  useEffect(() => {
    if (tab === "manage" && isAuthenticated) fetchProducts(manageCategory)
  }, [tab, manageCategory, isAuthenticated])

  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return
    try {
      const res  = await fetch(`/api/products/${product._id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || "Delete failed")
      setProducts(prev => prev.filter(p => p._id !== product._id))
    } catch (err) {
      alert("Delete failed: " + err.message)
    }
  }

  const openEdit = (product) => {
    setEditingProduct(product)
    setEditTitle(product.title)
    setEditDescription(product.description || "")
    setEditFiles([]); setEditPreviews([]); setEditError("")
  }

  const handleEditSave = async () => {
    setEditError("")
    if (!editTitle.trim()) { setEditError("Title is required."); return }
    setEditLoading(true)
    try {
      const body = { title: editTitle.trim(), description: editDescription.trim() }
      if (editFiles.length > 0) body.imagesBase64 = await Promise.all(editFiles.map(f => fileToBase64(f)))
      const res  = await fetch(`/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || "Update failed")
      setEditingProduct(null)
      fetchProducts(manageCategory)
    } catch (err) {
      setEditError(err.message || "Update failed.")
    } finally {
      setEditLoading(false)
    }
  }

  // ── Password Screen ───────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f4f1", fontFamily: "var(--font-jost, 'Segoe UI', sans-serif)" }}>
        <style>{MOBILE_STYLE}</style>
        <div style={{ background: "white", padding: "48px 44px", borderRadius: 16, boxShadow: "0 4px 40px rgba(0,0,0,0.12)", width: "100%", maxWidth: 420, textAlign: "center" }}>
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, letterSpacing: "-0.01em" }}>
              <span style={{ fontWeight: 700 }}>D</span><span style={{ fontWeight: 300 }}>esire Woods</span>
            </span>
            <p className="t-muted" style={{ fontSize: 11, color: "#888", letterSpacing: 3, textTransform: "uppercase", marginTop: 8 }}>Admin Access</p>
          </div>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password" placeholder="Enter password"
              value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} autoFocus
              style={{ width: "100%", padding: "15px 18px", border: "2px solid #e5e5e5", borderRadius: 10, fontSize: 14, marginBottom: authError ? 10 : 20, boxSizing: "border-box", outline: "none", fontFamily: "inherit", textAlign: "center", letterSpacing: 2, color: "#1a1a1a" }}
            />
            {authError && (
              <div className="msg-body" style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 8, padding: "10px", marginBottom: 20, color: "#dc2626", fontSize: 12, fontWeight: 600 }}>❌ {authError}</div>
            )}
            <button type="submit" style={{ width: "100%", padding: "15px", background: "#1a1a1a", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
              ACCESS DASHBOARD
            </button>
          </form>
          <p className="auth-footer" style={{ fontSize: 11, color: "#bbb", marginTop: 24, letterSpacing: 1 }}>Protected Area · Authorized Personnel Only</p>
        </div>
      </div>
    )
  }

  // ── Main Dashboard ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#f5f4f1", fontFamily: "var(--font-jost, 'Segoe UI', sans-serif)" }}>
      <style>{MOBILE_STYLE}</style>

      {/* Header */}
      <div style={{ background: "#1a1a1a", color: "white", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, letterSpacing: "-0.01em", color: "white" }}>
            <span style={{ fontWeight: 700 }}>D</span><span style={{ fontWeight: 300 }}>esire Woods</span>
          </span>
          <span className="header-label" style={{ fontSize: 11, color: "#888", letterSpacing: 3, textTransform: "uppercase", borderLeft: "1px solid #333", paddingLeft: 16 }}>
            Admin Panel
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/" style={{ color: "#c9a96e", fontSize: 12, textDecoration: "none", letterSpacing: 1.5 }}>← View Site</a>
          <button onClick={handleLogout} style={{ background: "none", border: "1px solid #444", color: "#ccc", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "white", borderBottom: "1px solid #e8e8e8", display: "flex", paddingLeft: 32 }}>
        {[{ id: "add", label: "➕ Add Product" }, { id: "manage", label: "🗂 Manage Products" }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={tab === t.id ? "" : "tab-inactive"}
            style={{
              padding: "16px 24px", background: "none", border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase",
              color: tab === t.id ? "#1a1a1a" : "#aaa",
              borderBottom: tab === t.id ? "2px solid #c9a96e" : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        {/* ── ADD TAB ── */}
        {tab === "add" && (
          <div style={{ background: "white", borderRadius: 16, padding: "40px 44px", boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6, color: "#1a1a1a" }}>Add New Product</h2>
            <p className="section-sub" style={{ color: "#999", fontSize: 13, marginBottom: 32 }}>
              Upload multiple images. All uploaded to Cloudinary, metadata saved to MongoDB.
            </p>

            {success && (
              <div className="msg-body" style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "14px 18px", marginBottom: 24, color: "#166534", fontWeight: 600, fontSize: 14 }}>
                ✅ Product added successfully! Switch to "Manage Products" to verify.
              </div>
            )}
            {addError && (
              <div className="msg-body" style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10, padding: "14px 18px", marginBottom: 24, color: "#dc2626", fontSize: 13 }}>
                ❌ {addError}
              </div>
            )}

            <FieldLabel>Category</FieldLabel>
            <StyledSelect value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </StyledSelect>

            <FieldLabel>Product Title *</FieldLabel>
            <StyledInput placeholder="e.g. Premium Teak Wardrobe" value={title} onChange={e => setTitle(e.target.value)} />

            <FieldLabel>Description</FieldLabel>
            <StyledTextarea placeholder="Short product description..." value={description} onChange={e => setDescription(e.target.value)} />

            <FieldLabel>Product Images * (select multiple)</FieldLabel>
            <div style={{ border: "2px dashed #ddd", borderRadius: 10, padding: "24px 20px", textAlign: "center", marginBottom: 18, background: "#fafafa" }}>
              <input type="file" accept="image/*" multiple onChange={e => handleFilesChange(e)} style={{ cursor: "pointer", color: "#333" }} />
              <p className="input-helper" style={{ color: "#bbb", fontSize: 12, marginTop: 8 }}>
                Hold Ctrl/Cmd to select multiple · JPG, PNG, WEBP
              </p>
            </div>

            {previews.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
                {previews.map((src, i) => (
                  <div key={i} style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
                    <img src={src} alt={`preview ${i+1}`} style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />
                    {i === 0 && (
                      <span style={{ position: "absolute", top: 6, left: 6, background: "#c9a96e", color: "white", fontSize: 9, padding: "2px 6px", letterSpacing: 1, fontWeight: 700, textTransform: "uppercase" }}>Main</span>
                    )}
                    <button onClick={() => removePreview(i)} style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", color: "white", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleUpload} disabled={loading}
              style={{
                width: "100%", padding: "15px",
                background: loading ? "#ccc" : "#1a1a1a", color: "white",
                border: "none", borderRadius: 10,
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 13, fontWeight: 700, letterSpacing: 2, transition: "background 0.2s",
              }}
            >
              {loading ? `⏳ Uploading ${files.length} image${files.length > 1 ? 's' : ''} to Cloudinary...` : "UPLOAD PRODUCT"}
            </button>
          </div>
        )}

        {/* ── MANAGE TAB ── */}
        {tab === "manage" && (
          <div>
            <div style={{ background: "white", borderRadius: 14, padding: "28px 32px", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", marginBottom: 28 }}>
              <FieldLabel>Select Category to Browse</FieldLabel>
              <StyledSelect value={manageCategory} onChange={e => setManageCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </StyledSelect>
              {!fetchingProducts && !fetchError && (
                <p className="t-muted" style={{ color: "#999", fontSize: 13, marginTop: -10 }}>
                  {products.length} product{products.length !== 1 ? "s" : ""} in{" "}
                  <b style={{ color: "#333" }}>{CATEGORIES.find(c => c.value === manageCategory)?.label}</b>
                </p>
              )}
            </div>

            {fetchError && (
              <div className="msg-body" style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10, padding: "16px 20px", marginBottom: 24, color: "#dc2626", fontSize: 13 }}>
                ❌ Error loading products: {fetchError}
              </div>
            )}

            {fetchingProducts ? (
              <div style={{ textAlign: "center", padding: 60 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
                <p className="t-sub" style={{ color: "#888", fontSize: 14 }}>Loading products from database...</p>
              </div>
            ) : products.length === 0 && !fetchError ? (
              <div style={{ background: "white", borderRadius: 14, padding: 60, textAlign: "center", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 48, marginBottom: 14 }}>📦</div>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#333" }}>No products in this category</p>
                <p className="t-sub" style={{ fontSize: 13, marginTop: 8, color: "#888" }}>
                  Add products using the "Add Product" tab first.
                </p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 22 }}>
                {products.map(product => {
                  const allImages = product.imageUrls || [product.imageUrl]
                  return (
                    <div key={product._id} style={{ background: "white", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
                      <div style={{ position: "relative", height: 200, background: "#f5f5f5" }}>
                        <img src={allImages[0]} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        {allImages.length > 1 && (
                          <span style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.7)", color: "white", fontSize: 10, padding: "3px 8px", borderRadius: 4, fontWeight: 600 }}>
                            +{allImages.length - 1} more
                          </span>
                        )}
                      </div>
                      <div style={{ padding: "16px 18px 18px" }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>{product.title}</h3>
                        {product.description && (
                          <p className="card-desc" style={{ fontSize: 12, color: "#888", marginBottom: 10, lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                            {product.description}
                          </p>
                        )}
                        <p className="stat-pill" style={{ fontSize: 11, color: "#c9a96e", marginBottom: 14, fontWeight: 600 }}>
                          🖼 {allImages.length} image{allImages.length !== 1 ? 's' : ''}
                        </p>
                        <div style={{ display: "flex", gap: 10 }}>
                          <button onClick={() => openEdit(product)} style={{ flex: 1, padding: "9px 0", background: "#1a1a1a", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>✏️ Edit</button>
                          <button onClick={() => handleDelete(product)} style={{ flex: 1, padding: "9px 0", background: "#fff5f5", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>🗑 Delete</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── EDIT MODAL ── */}
      {editingProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
          <div style={{ background: "white", borderRadius: 16, padding: "40px 44px", width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, color: "#1a1a1a" }}>Edit Product</h2>
            <p className="section-sub" style={{ color: "#888", fontSize: 13, marginBottom: 28 }}>
              Changes are saved to MongoDB. Upload new images to replace all current ones.
            </p>

            {editError && (
              <div className="msg-body" style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", marginBottom: 20, color: "#dc2626", fontSize: 13 }}>
                ❌ {editError}
              </div>
            )}

            <FieldLabel>Title *</FieldLabel>
            <StyledInput value={editTitle} onChange={e => setEditTitle(e.target.value)} />

            <FieldLabel>Description</FieldLabel>
            <StyledTextarea value={editDescription} onChange={e => setEditDescription(e.target.value)} />

            <FieldLabel>Replace Images (optional — select multiple)</FieldLabel>
            <input type="file" accept="image/*" multiple onChange={e => handleFilesChange(e, true)} style={{ display: "block", marginBottom: 14, color: "#333" }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10, marginBottom: 28 }}>
              {(editPreviews.length > 0 ? editPreviews : (editingProduct.imageUrls || [editingProduct.imageUrl])).map((src, i) => (
                <div key={i} style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
                  <img src={src} alt={`img ${i+1}`} style={{ width: "100%", height: 90, objectFit: "cover", display: "block" }} />
                  {i === 0 && <span style={{ position: "absolute", top: 4, left: 4, background: "#c9a96e", color: "white", fontSize: 8, padding: "2px 5px", fontWeight: 700, textTransform: "uppercase" }}>Main</span>}
                  {editPreviews.length > 0 && (
                    <button onClick={() => removePreview(i, true)} style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", color: "white", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={handleEditSave} disabled={editLoading} style={{ flex: 1, padding: "14px 0", background: editLoading ? "#aaa" : "#1a1a1a", color: "white", border: "none", borderRadius: 10, cursor: editLoading ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
                {editLoading ? "Saving..." : "SAVE CHANGES"}
              </button>
              <button onClick={() => setEditingProduct(null)} style={{ flex: 1, padding: "14px 0", background: "white", color: "#333", border: "1px solid #ddd", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FieldLabel({ children }) {
  return (
    <label className="t-label" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 8, letterSpacing: 1.5, textTransform: "uppercase" }}>
      {children}
    </label>
  )
}
function StyledInput({ ...props }) {
  return (
    <input {...props} style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #e5e5e5", borderRadius: 8, fontSize: 14, marginBottom: 20, boxSizing: "border-box", outline: "none", fontFamily: "inherit", color: "#1a1a1a" }} />
  )
}
function StyledTextarea({ ...props }) {
  return (
    <textarea {...props} rows={3} style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #e5e5e5", borderRadius: 8, fontSize: 14, marginBottom: 20, boxSizing: "border-box", resize: "vertical", outline: "none", fontFamily: "inherit", color: "#1a1a1a" }} />
  )
}
function StyledSelect({ children, ...props }) {
  return (
    <select {...props} style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #e5e5e5", borderRadius: 8, fontSize: 14, marginBottom: 20, background: "white", boxSizing: "border-box", outline: "none", fontFamily: "inherit", color: "#1a1a1a" }}>
      {children}
    </select>
  )
}