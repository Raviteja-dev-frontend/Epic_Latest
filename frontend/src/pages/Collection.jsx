import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CollectionItems from "./CollectionItems.jsx";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets.js";
import "./filter.css";
import "./CollectionItem.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const categoryFromUrl = params.get("category"); // category from URL

  const [category, setCategory] = useState(categoryFromUrl ? [categoryFromUrl] : []);
  const [sortType, setSortType] = useState("relevant");
  const [filterProducts, setFilterProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/category`);
        if (res.data?.success && Array.isArray(res.data.categories)) {
          setCategoryList(res.data.categories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategoryList();
  }, []);

  // Sync URL category to state
  useEffect(() => {
    if (categoryFromUrl) {
      setCategory([categoryFromUrl]);
    }
  }, [categoryFromUrl]);

  // Filter products whenever dependencies change
  useEffect(() => {
    if (!products || products.length === 0) {
      setFilterProducts([]);
      return;
    }

    let filtered = [...products];

    // Search filter
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      filtered = filtered.filter((item) => {
        const productCategory =
          typeof item.category === "string"
            ? item.category
            : item.category?.name || "";
        return category.some(
          (cat) => cat.toLowerCase() === productCategory.toLowerCase()
        );
      });
    }

    // Sorting
    if (sortType === "low-high") filtered.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") filtered.sort((a, b) => b.price - a.price);

    setFilterProducts(filtered);
  }, [products, category, search, showSearch, sortType]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const categoryTitle = category.length > 0 ? category.join(", ") : "All Products";
  const searchTitle = search ? ` - Results for "${search}"` : "";
  const pageTitle = `EpicMoments | ${categoryTitle}${searchTitle}`;
  let keywordSet = ["personalized gifts", "custom gifts", "photo frames", "EpicMoments"];
  if (category.length > 0) keywordSet = [...keywordSet, ...category];
  if (search) keywordSet.push(search);
  const metaKeywords = keywordSet.join(", ");

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Browse ${categoryTitle} from EpicMoments${
            search ? ` related to "${search}"` : ""
          }. Discover unique, handcrafted, and personalized gifts for every occasion.`}
        />
        <meta name="keywords" content={metaKeywords} />
      </Helmet>

      {showFilter && <div className="overlay" onClick={() => setShowFilter(false)}></div>}

      <div className="collection-layout">
        {/* Sidebar Filter */}
        <div className={`sidebar-filter ${showFilter ? "open" : ""}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-btn" onClick={() => setShowFilter(false)}>
              ✕
            </button>
          </div>

          <p className="category-title">Categories</p>
          <div className="category-list">
            {categoryList.length > 0 ? (
              categoryList.map((cat) => (
                <label key={cat._id} className="category-item">
                  <input
                    type="checkbox"
                    value={cat.name}
                    checked={category.includes(cat.name)}
                    onChange={toggleCategory}
                    className="checkbox"
                  />
                  <span className="category-name">{cat.name}</span>
                </label>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="product-area">
          <div className="product-header">
            <button className="filter-toggle-btn" onClick={() => setShowFilter(true)}>
              <img
                src={assets.dropdown_icon}
                alt="filter"
                style={{ width: "16px", marginRight: "5px" }}
              />
              <h1>Filters</h1>
            </button>
            <h1>{categoryTitle}</h1>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="sort-select"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="collection-grid">
            {filterProducts.length > 0 ? (
              filterProducts.map((item) => (
                <CollectionItems
                  key={item._id}
                  id={item._id}
                  media={item.media}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
