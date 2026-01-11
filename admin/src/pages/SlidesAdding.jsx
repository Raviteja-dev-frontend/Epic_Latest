import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";

const AddSlide = ({ token, onUpload }) => {
  const [media, setMedia] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const MAX_SIZE_MB = 1040;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File size exceeds ${MAX_SIZE_MB}MB`);
      return;
    }

    setMedia(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!media) {
      toast.error("Please select a media file");
      return;
    }

    if (!name.trim()) {
      toast.error("Slide name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("media", media);

    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/slides/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setMedia(null);
        if (onUpload) onUpload(); // refresh list
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full max-w-md">
      <div>
        <p className="mb-2 font-medium">Media File (image/video/gif)</p>
        <label htmlFor="mediaUpload" className="cursor-pointer block w-fit">
          {media ? (
            media.type.startsWith("video") ? (
              <video className="w-40 h-24 object-cover rounded" controls src={URL.createObjectURL(media)} />
            ) : (
              <img className="w-40 h-24 object-cover rounded" src={URL.createObjectURL(media)} alt="preview" />
            )
          ) : (
            <img className="w-40 h-24 object-cover rounded" src={assets.upload_area} alt="upload placeholder" />
          )}
          <input
            type="file"
            id="mediaUpload"
            accept="image/*,video/*,.gif"
            hidden
            onChange={handleFileChange}
          />
        </label>
        {media && (
          <p className="text-sm text-gray-600 mt-1">
            {media.type} • {(media.size / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
      </div>

      <div>
        <p className="mb-2 font-medium">Slide Name</p>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter slide name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default AddSlide;
