import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const SlidesList = ({ token }) => {
  const [slides, setSlides] = useState([]);

  const fetchSlides = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/slides/list`);
      if (res.data.success) {
        setSlides(res.data.slides.reverse()); // fixed typo from "slidess"
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch slides");
    }
  };

  const removeSlide = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/slides/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Slide removed");
        fetchSlides();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing slide");
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <>
      <p className="mb-2 font-semibold text-lg">Slides List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[3fr_3fr_1fr] items-center py-2 px-3 bg-gray-100 font-bold border">
          <span>Media</span>
          <span>Slide Name</span>
          <span className="text-center">Action</span>
        </div>

        {slides.map((slide) => (
          <div
            key={slide._id}
            className="grid grid-cols-[3fr_3fr_1fr] items-center gap-2 py-2 px-3 border text-sm"
          >
            {/* Media Display */}
            {slide.image && slide.image.length > 0 ? (
              slide.image[0].includes(".mp4") ? (
                <video src={slide.image[0]} controls className="w-32 h-24 object-cover rounded" />
              ) : (
                <img src={slide.image[0]} alt={slide.name} className="w-32 h-24 object-cover rounded" />
              )
            ) : (
              <p>No media</p>
            )}

            {/* Slide Name */}
            <p className="truncate">{slide.name || "Unnamed slide"}</p>

            {/* Remove Button */}
            <p
              onClick={() => removeSlide(slide._id)}
              className="text-right text-red-500 cursor-pointer text-lg font-bold hover:text-red-700"
            >
              ×
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SlidesList;
