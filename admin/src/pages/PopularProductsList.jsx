import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const PopularProductsList = ({ token }) => {
  const [products, setProducts] = useState([]);

  // Fetch all popular products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/popular/list`);
      if (res.data.success) {
        setProducts(res.data.popularProducts.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch popular products");
    }
  };

  // Remove a popular product
  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/popular/remove`,
        { id },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Popular product removed");
        fetchProducts();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <p className="mb-3 font-semibold text-lg">Popular Products List</p>

      <div className="flex flex-col gap-2">

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-[2fr_2fr_1fr] items-center py-2 px-3 bg-gray-100 font-semibold border">
          <span>Media</span>
          <span>Name</span>
          <span className="text-center">Action</span>
        </div>

        {/* List Items */}
        {products.map((item) => {
          const mediaUrl =
            item?.image && item.image.length > 0 ? item.image[0] : null;

          const isVideo = mediaUrl
            ? mediaUrl.endsWith(".mp4") ||
              mediaUrl.endsWith(".mov") ||
              mediaUrl.includes("video")
            : false;

          return (
            <div
              key={item._id}
              className="grid grid-cols-[2fr_2fr_1fr] items-center gap-2 py-2 px-3 border text-sm"
            >
              {/* Media */}
              <div>
                {mediaUrl ? (
                  isVideo ? (
                    <video
                      src={mediaUrl}
                      controls
                      className="w-28 h-20 object-cover rounded"
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt="product"
                      className="w-28 h-20 object-cover rounded"
                    />
                  )
                ) : (
                  <p>No media</p>
                )}
              </div>

              {/* Product Name */}
              <p className="truncate">{item.name ?? "Unnamed Product"}</p>

              {/* Delete Button */}
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right text-red-500 cursor-pointer text-xl font-bold hover:text-red-700"
              >
                ×
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PopularProductsList;
