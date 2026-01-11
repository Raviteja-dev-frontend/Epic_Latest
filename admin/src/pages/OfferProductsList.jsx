import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const OfferProductsList = ({ token }) => {
  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    originalPrice: "",
    offerPrice: "",
    days: "",
    category: "",
    media: null,
    preview: "",
  });

  // Fetch products
  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/offer/list`);
      if (res.data.success) setList(res.data.products);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error("Failed to fetch offer products");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/category`);
      if (res.data.success) setCategoryList(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
    fetchCategories();
  }, []);

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this offer product?")) return;
    try {
      const res = await axios.post(`${backendUrl}/api/offer/delete`, { id }, { headers: { token } });
      if (res.data.success) {
        toast.success("Deleted");
        fetchList();
      } else toast.error(res.data.message);
    } catch {
      toast.error("Delete failed");
    }
  };

  const openEdit = (item) => {
    setEditing(item._id);
    setEditData({
      name: item.name,
      originalPrice: item.originalPrice,
      offerPrice: item.offerPrice,
      days: item.days || "",
      category: item.category || "",
      media: null,
      preview: item.media?.url || "",
    });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setEditData(prev => ({ ...prev, media: file, preview: URL.createObjectURL(file) }));
  };

  const saveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editing);
      formData.append("name", editData.name);
      formData.append("originalPrice", editData.originalPrice);
      formData.append("offerPrice", editData.offerPrice);
      formData.append("days", editData.days);
      formData.append("category", editData.category);
      if (editData.media) formData.append("media", editData.media);

      const res = await axios.post(`${backendUrl}/api/offer/update`, formData, { headers: { token } });

      if (res.data.success) {
        toast.success("Offer product updated");
        setEditing(null);
        fetchList();
      } else toast.error(res.data.message);
    } catch {
      toast.error("Update failed");
    }
  };

  // Filtered products
  const filteredList = filterCategory
    ? list.filter(item => item.category === filterCategory)
    : list;

  return (
    <div>
      <p className="mb-3 font-bold text-lg">Offer Products List</p>

      {/* Category Filter */}
      <select
        value={filterCategory}
        onChange={e => setFilterCategory(e.target.value)}
        className="mb-3 border px-2 py-1 rounded"
      >
        <option value="">-- All Categories --</option>
        {categoryList.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
      </select>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-2 py-2 px-2 bg-gray-100 border font-semibold text-sm">
        <p>Media</p>
        <p>Name</p>
        <p>Original</p>
        <p>Offer</p>
        <p>Days</p>
        <p>Action</p>
      </div>

      {/* Products List */}
      {filteredList.map(item => (
        <div
          key={item._id}
          className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm"
        >
          {/* Media */}
          <div className="w-12 h-12 border rounded overflow-hidden">
            {item.media?.type === "image" ? (
              <img src={item.media.url} className="w-full h-full object-cover" />
            ) : item.media?.type === "video" ? (
              <video src={item.media.url} className="w-full h-full object-cover" />
            ) : (
              <p>No Media</p>
            )}
          </div>

          {/* Info */}
          <p>{item.name}</p>
          <p>₹{item.originalPrice}</p>
          <p className="text-green-600 font-semibold">₹{item.offerPrice}</p>
          <p>{item.days || "—"}</p>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button className="text-blue-600 underline" onClick={() => openEdit(item)}>Edit</button>
            <button className="text-red-600 underline" onClick={() => removeProduct(item._id)}>Delete</button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-5 rounded shadow-lg">
            <h3 className="font-bold text-lg mb-3">Edit Offer Product</h3>

            <label>Name</label>
            <input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full border rounded px-2 py-1 mb-3" />

            <label>Original Price</label>
            <input type="number" value={editData.originalPrice} onChange={e => setEditData({...editData, originalPrice: e.target.value})} className="w-full border rounded px-2 py-1 mb-3" />

            <label>Offer Price</label>
            <input type="number" value={editData.offerPrice} onChange={e => setEditData({...editData, offerPrice: e.target.value})} className="w-full border rounded px-2 py-1 mb-3" />

            <label>Days</label>
            <input type="number" value={editData.days} onChange={e => setEditData({...editData, days: e.target.value})} className="w-full border rounded px-2 py-1 mb-3" />

            <label>Category</label>
            <select value={editData.category} onChange={e => setEditData({...editData, category: e.target.value})} className="w-full border rounded px-2 py-1 mb-3">
              <option value="">-- Select Category --</option>
              {categoryList.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
            </select>

            <label>Change Media</label>
            <input type="file" onChange={handleMediaChange} className="mb-3" />

            {editData.preview && (
              <img src={editData.preview} className="w-full h-40 object-cover rounded mb-3" />
            )}

            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setEditing(null)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferProductsList;
