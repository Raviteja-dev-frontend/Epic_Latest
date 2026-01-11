import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import placeholder from "../assets/upload_area.png";

const GoogleReviewAdd = ({ token }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [media, setMedia] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !rating || !review)
      return toast.error("All fields except image are required");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("rating", rating);
      formData.append("review", review);

      if (media) formData.append("media", media);

      const res = await axios.post(
        `${backendUrl}/api/googlereviews/add`,
        formData,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Review Added Successfully");
        setName("");
        setRating("");
        setReview("");
        setMedia(null);
      }
    } catch (err) {
      toast.error("Upload Failed");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      {/* IMAGE / VIDEO UPLOAD */}
      <label htmlFor="reviewImage" className="cursor-pointer">
        {media ? (
          /\.(mp4|mov|webm)$/i.test(media.name) ? (
            <video
              src={URL.createObjectURL(media)}
              className="w-32 h-32 rounded"
              autoPlay
              loop
              muted
            />
          ) : (
            <img src={URL.createObjectURL(media)} className="w-32 rounded" />
          )
        ) : (
          <img src={placeholder} className="w-32 rounded" />
        )}

        <input
          type="file"
          id="reviewImage"
          accept="image/*,video/*"
          hidden
          onChange={(e) => setMedia(e.target.files[0])}
        />
      </label>

      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        className="border p-2 rounded"
        placeholder="Rating (1–5)"
        value={rating}
        min="1"
        max="5"
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <textarea
        className="border p-2 rounded"
        placeholder="Write Review"
        rows="3"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />

      <button className="bg-black text-white py-2 rounded">
        Add Review
      </button>
    </form>
  );
};

export default GoogleReviewAdd;
