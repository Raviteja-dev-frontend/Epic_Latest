import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import placeholder from "../assets/upload_area.png";

const BusinessNeeds = ({ token }) => {
  const [media, setMedia] = useState(null);
  const [name, setName] = useState("");
  const [startingPrice, setStartingPrice] = useState(""); // optional
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  // FETCH CATEGORY LIST
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/category`);
        if (res.data.success) setCategoryList(res.data.categories);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // SUBMIT HANDLER
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!media) return toast.error("Please upload an image");
    if (!name) return toast.error("Enter title");
    if (!category) return toast.error("Select a category");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("media", media);

      // Optional field
      if (startingPrice) formData.append("startingPrice", startingPrice);

      const res = await axios.post(
        `${backendUrl}/api/businessneeds/add`,
        formData,
        {
          headers: { token, "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success("Business Need Added");
        setName("");
        setCategory("");
        setStartingPrice("");
        setMedia(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      {/* IMAGE UPLOAD */}
      <label htmlFor="mediaUpload" className="cursor-pointer">
        {media ? (
          media.type.startsWith("video") ? (
            <video
              src={URL.createObjectURL(media)}
              controls
              className="w-40 rounded"
            />
          ) : (
            <img src={URL.createObjectURL(media)} className="w-40 rounded" />
          )
        ) : (
          <img src={placeholder} className="w-40 rounded" alt="upload" />
        )}

        <input
          type="file"
          id="mediaUpload"
          accept="image/*,video/*,gif/*"
          hidden
          onChange={(e) => setMedia(e.target.files[0])}
        />
      </label>

      {/* TITLE */}
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Enter Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* STARTING PRICE OPTIONAL */}
      <input
        type="number"
        className="border p-2 rounded"
        placeholder="Starting Price (Optional)"
        value={startingPrice}
        onChange={(e) => setStartingPrice(e.target.value)}
      />

      {/* CATEGORY */}
      <select
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">-- Select Category --</option>
        {categoryList.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* SUBMIT */}
      <button className="bg-black text-white py-2 rounded">
        Add Business Need
      </button>
    </form>
  );
};

export default BusinessNeeds;
