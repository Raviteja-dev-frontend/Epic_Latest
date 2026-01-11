import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const DeskDecorativesList = ({ token }) => {
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

  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/deskdecoratives/list`);
      if (res.data.success) setList(res.data.products);
    } catch {
      toast.error("Failed to load list");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/category`);
      if (res.data.success) setCategoryList(res.data.categories);
    } catch {}
  };

  useEffect(() => {
    fetchList();
    fetchCategories();
  }, []);

  const removeItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/deskdecoratives/delete`,
        { id },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Deleted Successfully");
        fetchList();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const openEdit = (item) => {
    setEditing(item._id);
    setEditData({
      name: item.name,
      originalPrice: item.originalPrice,
      offerPrice: item.offerPrice || "",
      days: item.days || "",
      category: item.category,
      preview: item.media.url,
      media: null,
    });
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

      const res = await axios.post(
        `${backendUrl}/api/deskdecoratives/update`,
        formData,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Updated Successfully");
        setEditing(null);
        fetchList();
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const filtered = filterCategory
    ? list.filter((item) => item.category === filterCategory)
    : list;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="font-bold text-xl mb-3">Desk Decoratives List</h2>

      <select className="border p-2 rounded mb-4" value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="">-- All Categories --</option>
        {categoryList.map((cat) => (
          <option key={cat._id} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      {/* LIST */}
      {filtered.map((item) => (
        <div key={item._id} className="border p-3 mb-2 grid grid-cols-5 gap-2 items-center">
          <img src={item.media.url} className="w-16 h-16 object-cover rounded" />

          <p>{item.name}</p>
          <p>₹{item.originalPrice}</p>
          <p>{item.offerPrice ? "₹" + item.offerPrice : "—"}</p>

          <div>
            <button className="text-blue-600 underline mr-3" onClick={() => openEdit(item)}>Edit</button>
            <button className="text-red-600 underline" onClick={() => removeItem(item._id)}>Delete</button>
          </div>
        </div>
      ))}

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="font-bold mb-3">Edit Item</h3>

            <input type="text" className="border p-2 rounded w-full mb-2"
              value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />

            <input type="number" className="border p-2 rounded w-full mb-2"
              value={editData.originalPrice}
              onChange={(e) => setEditData({...editData, originalPrice: e.target.value})} />

            <input type="number" className="border p-2 rounded w-full mb-2"
              value={editData.offerPrice}
              onChange={(e) => setEditData({...editData, offerPrice: e.target.value})} />

            <input type="number" className="border p-2 rounded w-full mb-2"
              value={editData.days}
              onChange={(e) => setEditData({...editData, days: e.target.value})} />

            <select className="border p-2 rounded w-full mb-2"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}>
              <option value="">-- Select Category --</option>
              {categoryList.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>

            <input type="file" className="mb-2"
              onChange={(e) => {
                setEditData({
                  ...editData,
                  media: e.target.files[0],
                  preview: URL.createObjectURL(e.target.files[0]),
                });
              }} />

            <img src={editData.preview} className="w-full h-40 object-cover rounded" />

            <div className="flex justify-between mt-4">
              <button className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={() => setEditing(null)}>Cancel</button>

              <button className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeskDecorativesList;
