import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import placeholder from "../assets/upload_area.png"; // <-- your placeholder image

const OfferProducts = ({ token }) => {
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
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!media) return toast.error("Please select media");
    if (!category) return toast.error("Please select a category");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("originalPrice", originalPrice);
      formData.append("offerPrice", offerPrice);
      formData.append("days", days);
      formData.append("category", category);
      formData.append("media", media);

      const res = await axios.post(`${backendUrl}/api/offer/add`, formData, {
        headers: { "Content-Type": "multipart/form-data", token },
      });

      if (res.data.success) {
        toast.success(res.data.message || "Offer product added");
        setName("");
        setOriginalPrice("");
        setOfferPrice("");
        setDays("");
        setMedia(null);
        setCategory("");
      } else toast.error(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full max-w-md">
      <div>
        <p className="mb-1">Upload Media</p>
        <label htmlFor="mediaUpload" className="cursor-pointer">
          {media ? (
            media.type.startsWith("video") ? (
              <video src={URL.createObjectURL(media)} controls className="w-40 mt-2" />
            ) : (
              <img src={URL.createObjectURL(media)} alt="preview" className="w-40 mt-2" />
            )
          ) : (
            <img src={placeholder} alt="upload placeholder" className="w-40 mt-2" />
          )}
          <input
            type="file"
            id="mediaUpload"
            accept="image/*,video/*,gif/*"
            onChange={(e) => setMedia(e.target.files[0])}
            hidden
          />
        </label>
      </div>

      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded px-2 py-1" required />
      <input type="number" placeholder="Original Price" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="border rounded px-2 py-1" required />
      <input type="number" placeholder="Offer Price" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className="border rounded px-2 py-1" required />
      <input type="number" placeholder="Days (Optional)" value={days} onChange={(e) => setDays(e.target.value)} className="border rounded px-2 py-1" />

      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-2 py-1" required>
        <option value="">-- Select Category --</option>
        {categoryList.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
      </select>

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Add Offer Product</button>
    </form>
  );
};

export default OfferProducts;
