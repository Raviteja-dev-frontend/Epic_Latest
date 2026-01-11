import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [expanded, setExpanded] = useState(null);

  // Fetch all products from backend
  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        // Reverse order to show latest first
        setList(res.data.products.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to fetch product list");
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete product');
    }
  };

  // Generate keywords for product (example external API call)
  const generateKeyword = async (name, description) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/keyword/generate`,
        { name, description },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success('Keyword generated successfully');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Keyword generation failed');
      console.error(err);
    }
  };

  // Handle review edits locally
  const handleReviewChange = (productId, index, field, value) => {
    setList((prevList) =>
      prevList.map((item) =>
        item._id === productId
          ? {
              ...item,
              reviews: item.reviews.map((rev, i) =>
                i === index ? { ...rev, [field]: field === 'rating' ? Number(value) : value } : rev
              ),
            }
          : item
      )
    );
  };

  // Add new review locally (to UI)
  const handleAddReview = (productId) => {
    setList((prevList) =>
      prevList.map((item) =>
        item._id === productId
          ? {
              ...item,
              reviews: [...(item.reviews || []), { reviewer: '', comment: '', rating: 5 }],
            }
          : item
      )
    );
    setExpanded(productId);
  };

  // Delete review with backend update
  const handleDeleteReview = async (productId, index) => {
    const product = list.find((item) => item._id === productId);
    if (!product) return;

    const updatedReviews = product.reviews.filter((_, i) => i !== index);

    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update-reviews/${productId}`,
        { reviews: updatedReviews },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success('Review deleted');
        setList((prev) =>
          prev.map((item) => (item._id === productId ? { ...item, reviews: updatedReviews } : item))
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete review');
    }
  };

  // Save all reviews edits to backend
  const handleUpdateReview = async (productId, reviews) => {
    for (const rev of reviews) {
      if (
        !rev.reviewer.trim() ||
        !rev.comment.trim() ||
        isNaN(rev.rating) ||
        rev.rating < 0 ||
        rev.rating > 5
      ) {
        toast.error('Please fill all review fields correctly (rating 0-5).');
        return;
      }
    }

    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update-reviews/${productId}`,
        { reviews },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success('Reviews updated');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update reviews');
    }
  };

  // Calculate average rating with 1 decimal point
  const getAverageRating = (reviews = []) => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((acc, rev) => acc + Number(rev.rating), 0);
    return (total / reviews.length).toFixed(1);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-2 font-bold text-lg">All Products List</p>

      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
          <p>Media</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Sizes</p>
          <p>Reviews</p>
          <p className="text-center">Action</p>
        </div>

        {list.map((item) => (
          <div key={item._id}>
            <div className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
              {/* Show first media preview (image/video/audio icon or placeholder) */}
              <div className="w-12 h-12 flex items-center justify-center border rounded overflow-hidden bg-white">
                {item.media?.length > 0 ? (
                  item.media[0].type === 'image' ? (
                    <img
                      className="w-full h-full object-cover"
                      src={item.media[0].url}
                      alt={item.name}
                    />
                  ) : item.media[0].type === 'video' ? (
                    <video
                      className="w-full h-full object-cover"
                      src={item.media[0].url}
                      muted
                      loop
                      playsInline
                    />
                  ) : item.media[0].type === 'audio' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-500"
                      title="Audio file"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m0 0l3-3m-3 3l-3-3m9 3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <p className="text-xs text-gray-500">No preview</p>
                  )
                ) : (
                  <p className="text-xs text-gray-400">No media</p>
                )}
              </div>

              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {item.price} {currency}
              </p>
              <p>{item.sizes?.join(', ')}</p>
              <div className="text-xs text-center">
                <p>{item.reviews?.length || 0} reviews</p>
                <p>⭐ {getAverageRating(item.reviews)}</p>
                <button
                  onClick={() => setExpanded(expanded === item._id ? null : item._id)}
                  className="text-blue-500 underline mt-1"
                >
                  {expanded === item._id ? 'Hide' : 'View'}
                </button>

                <button
                  onClick={() => generateKeyword(item.name, item.description)}
                  className="mt-1 block text-white bg-purple-600 px-2 py-1 rounded hover:bg-purple-800 disabled:bg-gray-400"
                  disabled={!item.description}
                >
                  ⚡ Generate Keyword
                </button>
              </div>

              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-lg text-red-600 hover:text-red-800"
                title="Delete Product"
              >
                X
              </p>
            </div>

            {expanded === item._id && (
              <div className="bg-gray-50 border-l-4 border-blue-300 p-4 mb-2 text-sm">
                <p className="font-semibold mb-3">Reviews for {item.name}</p>

                <button
                  onClick={() => handleAddReview(item._id)}
                  className="mb-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Add Review
                </button>

                {item.reviews?.map((rev, i) => (
                  <div
                    key={i}
                    className="mb-3 border rounded p-2 bg-white relative shadow-sm"
                  >
                    <button
                      onClick={() => handleDeleteReview(item._id, i)}
                      className="absolute top-1 right-1 text-red-500"
                      title="Delete Review"
                    >
                      ✕
                    </button>

                    <input
                      type="text"
                      value={rev.reviewer}
                      onChange={(e) =>
                        handleReviewChange(item._id, i, 'reviewer', e.target.value)
                      }
                      className="w-full border px-2 py-1 rounded mb-2"
                      placeholder="Reviewer"
                    />

                    <textarea
                      value={rev.comment}
                      onChange={(e) =>
                        handleReviewChange(item._id, i, 'comment', e.target.value)
                      }
                      className="w-full border px-2 py-1 rounded mb-2"
                      placeholder="Comment"
                      rows={2}
                    />

                    <input
                      type="number"
                      value={rev.rating}
                      onChange={(e) =>
                        handleReviewChange(item._id, i, 'rating', e.target.value)
                      }
                      className="w-full border px-2 py-1 rounded"
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="Rating"
                    />
                  </div>
                ))}

                <button
                  onClick={() => handleUpdateReview(item._id, item.reviews)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Reviews
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
