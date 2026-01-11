import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const GoogleReviewList = ({ token }) => {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    rating: "",
    review: "",
    media: null,
    preview: "",
  });

  // Fetch All Reviews
  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/googlereviews/list`);
      if (res.data.success) setList(res.data.data);
    } catch {
      toast.error("Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Delete Handler
  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/googlereviews/delete`,
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
      name: item.name,
      rating: item.rating,
      review: item.review,
      media: null,
      preview: item.media?.url || "",
    });
  };

  // Save Edit
  const saveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editing);
      formData.append("name", editData.name);
      formData.append("rating", editData.rating);
      formData.append("review", editData.review);

      if (editData.media) {
        formData.append("media", editData.media);
      }

      const res = await axios.post(
        `${backendUrl}/api/googlereviews/update`,
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

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="font-bold text-xl mb-3">Google Reviews</h2>

      {list.map((item) => (
        <div
          key={item._id}
          className="border p-3 grid grid-cols-5 gap-2 items-center mb-2"
        >
          {/* FIX: IMAGE/VIDEO DISPLAY */}
          {item.media?.url ? (
            /\.(mp4|mov|webm)$/i.test(item.media.url) ? (
              <video
                src={item.media.url}
                className="w-16 h-16 object-cover rounded"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={item.media.url}
                className="w-16 h-16 object-cover rounded"
                alt=""
              />
            )
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs">
              No Media
            </div>
          )}

          <p>{item.name}</p>
          <p>⭐ {item.rating}</p>
          <p className="truncate">{item.review}</p>

          <div>
            <button
              className="text-blue-600 underline mr-3"
              onClick={() => openEdit(item)}
            >
              Edit
            </button>
            <button
              className="text-red-600 underline"
              onClick={() => deleteReview(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* EDIT POPUP */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="font-bold mb-3">Edit Review</h3>

            <input
              type="text"
              value={editData.name}
              className="border p-2 rounded w-full mb-2"
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />

            <input
              type="number"
              min="1"
              max="5"
              value={editData.rating}
              className="border p-2 rounded w-full mb-2"
              onChange={(e) => setEditData({ ...editData, rating: e.target.value })}
            />

            <textarea
              className="border p-2 rounded w-full mb-2"
              rows="3"
              value={editData.review}
              onChange={(e) => setEditData({ ...editData, review: e.target.value })}
            />

            {/* FILE UPLOAD */}
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

            {/* FIX: Preview for video/image */}
            {editData.preview && (
              /\.(mp4|mov|webm)$/i.test(editData.preview) ? (
                <video
                  src={editData.preview}
                  className="w-full h-40 object-cover rounded"
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <img
                  src={editData.preview}
                  className="w-full h-40 object-cover rounded"
                />
              )
            )}

            <div className="flex justify-between mt-3">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
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

export default GoogleReviewList;
