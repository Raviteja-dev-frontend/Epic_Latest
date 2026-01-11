// Catagere.js
import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Catagere = ({ token }) => {
  const [media, setMedia] = useState(null); // single image/video/gif file
  const [name, setName] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!media) {
      toast.error("Please select an image, video, or gif file");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("media", media);

      const response = await axios.post(backendUrl + "/api/catagere/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setMedia(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to upload");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image/Video/Gif</p>
        <label htmlFor="mediaUpload" className="cursor-pointer">
          {media ? (
            media.type.startsWith("video") ? (
              <video className="w-40" controls src={URL.createObjectURL(media)} />
            ) : (
              <img className="w-40" src={URL.createObjectURL(media)} alt="preview" />
            )
          ) : (
            <img className="w-40" src={assets.upload_area} alt="upload placeholder" />
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

      <div className="w-full">
        <p className="mb-2">Name</p>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white hover:bg-gray-800 transition">
        ADD
      </button>
    </form>
  );
};

export default Catagere;
