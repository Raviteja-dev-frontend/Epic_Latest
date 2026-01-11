import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const BusinessNeedsList = ({ token }) => {
  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [editing, setEditing] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    priority: "", // optional starting price
    category: "",
    media: null,
    preview: "",
  });

  // Fetch list
  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/businessneeds/list`);
      if (res.data.success) setList(res.data.data);
    } catch {
      toast.error("Failed to load items");
    }
  };

  // Fetch categories
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

  // Delete
  const removeItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/businessneeds/delete`,
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

  // Open Edit
  const openEdit = (item) => {
    setEditing(item._id);
    setEditData({
      title: item.title,
      priority: item.priority || "", // optional
      category: item.category,
      media: null,
      preview: item.media,
    });
  };

  // Save Edit
  const saveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editing);
      formData.append("title", editData.title);
      formData.append("priority", editData.priority);
      formData.append("category", editData.category);

      if (editData.media) formData.append("media", editData.media);

      const res = await axios.post(
        `${backendUrl}/api/businessneeds/update`,
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

  // Filter List
  const filtered = filterCategory
    ? list.filter((item) => item.category === filterCategory)
    : list;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="font-bold text-xl mb-3">Business Needs List</h2>

      <select
        className="border p-2 rounded mb-4"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">-- All Categories --</option>
        {categoryList.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {filtered.map((item) => (
        <div
          key={item._id}
          className="border p-3 mb-2 grid grid-cols-5 gap-2 items-center"
        >
          <img
            src={item.media}
            className="w-16 h-16 object-cover rounded"
            alt=""
          />

          <p>{item.title}</p>
          <p>{item.priority ? "₹" + item.priority : "—"}</p>
          <p>{item.category}</p>

          <div>
            <button
              className="text-blue-600 underline mr-3"
              onClick={() => openEdit(item)}
            >
              Edit
            </button>
            <button
              className="text-red-600 underline"
              onClick={() => removeItem(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* EDIT POPUP  */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="font-bold mb-3">Edit Business Need</h3>

            <input
              type="text"
              className="border p-2 rounded w-full mb-2"
              placeholder="Title"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            {/* Optional Starting Price */}
            <input
              type="number"
              className="border p-2 rounded w-full mb-2"
              placeholder="Starting Price (optional)"
              value={editData.priority}
              onChange={(e) =>
                setEditData({ ...editData, priority: e.target.value })
              }
            />

            {/* Category */}
            <select
              className="border p-2 rounded w-full mb-2"
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
            >
              <option value="">-- Select Category --</option>
              {categoryList.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Media */}
            <input
              type="file"
              className="mb-2"
              onChange={(e) =>
                setEditData({
                  ...editData,
                  media: e.target.files[0],
                  preview: URL.createObjectURL(e.target.files[0]),
                })
              }
            />

            {editData.preview && (
              <img
                src={editData.preview}
                className="w-full h-40 object-cover rounded"
                alt="preview"
              />
            )}

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>

              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessNeedsList;
