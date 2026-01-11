import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import placeholder from "../assets/upload_area.png";

const DeskDecoratives = ({ token }) => {
  const [media, setMedia] = useState(null);
  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [days, setDays] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  // Fetch categories
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!media) return toast.error("Please upload media");
    if (!category) return toast.error("Select a category");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("originalPrice", originalPrice);
      formData.append("offerPrice", offerPrice);
      formData.append("days", days);
      formData.append("category", category);
      formData.append("media", media);

      const res = await axios.post(
        `${backendUrl}/api/deskdecoratives/add`,
        formData,
        {
          headers: { token, "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success("Added Successfully");
        setName("");
        setOriginalPrice("");
        setOfferPrice("");
        setDays("");
        setMedia(null);
        setCategory("");
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full max-w-md mx-auto">

      {/* Media Upload */}
      <label htmlFor="mediaUpload" className="cursor-pointer">
        {media ? (
          media.type.startsWith("video") ? (
            <video src={URL.createObjectURL(media)} controls className="w-40 rounded" />
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

      <input type="text" className="border p-2 rounded" placeholder="Product Name"
        value={name} onChange={(e) => setName(e.target.value)} required />

      <input type="number" className="border p-2 rounded" placeholder="Original Price"
        value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} required />

      <input type="number" className="border p-2 rounded" placeholder="Offer Price (Optional)"
        value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} />

      <input type="number" className="border p-2 rounded" placeholder="Days (Optional)"
        value={days} onChange={(e) => setDays(e.target.value)} />

      <select className="border p-2 rounded" value={category}
        onChange={(e) => setCategory(e.target.value)} required>
        <option value="">-- Select Category --</option>
        {categoryList.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <button className="bg-black text-white py-2 rounded">Add Desk Decorative</button>
    </form>
  );
};

export default DeskDecoratives;
