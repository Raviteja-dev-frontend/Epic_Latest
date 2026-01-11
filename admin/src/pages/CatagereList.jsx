// // CategoryList.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const CategoryList = ({ token }) => {
//   const [categories, setCategories] = useState([]);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(backendUrl + "/api/catagere/list");
//       if (res.data.success) {
//         setCategories(res.data.categories.reverse());
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch categories");
//     }
//   };

//   const removeCategory = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?")) return;

//     try {
//       const res = await axios.post(
//         backendUrl + "/api/category/remove",
//         { id },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success("Category removed");
//         fetchCategories();
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error removing category");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <>
//       <p className="mb-2 font-semibold text-lg">Category List</p>
//       <div className="flex flex-col gap-2">
//         <div className="hidden md:grid grid-cols-[5fr_1fr] items-center py-2 px-3 bg-gray-100 font-bold border">
//           <span>Category Name</span>
//           <span className="text-center">Action</span>
//         </div>

//         {categories.map((cat) => (
//           <div
//             key={cat._id}
//             className="grid grid-cols-[5fr_1fr] items-center gap-2 py-2 px-3 border text-sm"
//           >
//             <p className="truncate">{cat.name || "Unnamed Category"}</p>
//             <p
//               onClick={() => removeCategory(cat._id)}
//               className="text-right text-red-500 cursor-pointer text-lg font-bold hover:text-red-700"
//             >
//               ×
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default CategoryList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const CategoryList = ({ token }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/catagere/list`);
      if (res.data.success) {
        setCategories(res.data.catageres.reverse()); // Use correct key from backend
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    }
  };

  const removeCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/catagere/remove`, // Fixed endpoint
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Category removed");
        fetchCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <p className="mb-2 font-semibold text-lg">Category List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[3fr_3fr_1fr] items-center py-2 px-3 bg-gray-100 font-bold border">
           <span>Media</span>
          <span>Category Name</span>
         
          <span className="text-center">Action</span>
        </div>

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="grid grid-cols-[3fr_3fr_1fr] items-center gap-2 py-2 px-3 border text-sm"
          >
             {/* Media Display */}
            {cat.image && cat.image.length > 0 ? (
              cat.image[0].includes(".mp4") ? (
                <video src={cat.image[0]} controls className="w-32 h-24 object-cover" />
              ) : (
                <img src={cat.image[0]} alt="category" className="w-32 h-24 object-cover" />
              )
            ) : (
              <p>No media</p>
            )}
            {/* Category Name */}
            <p className="truncate">{cat.name || "Unnamed Category"}</p>

           

            {/* Remove Button */}
            <p
              onClick={() => removeCategory(cat._id)}
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

export default CategoryList;
