import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FaPlusCircle,
  FaList,
  FaShoppingCart,
  FaImages,
  FaClipboardList,
  FaThLarge,
  FaThList,
  FaFolderOpen,
  FaEnvelope,
  FaKey,
  FaBox,
   FaStar,
  FaTags,
  FaListAlt
} from 'react-icons/fa';

const Sidebar = () => {
  const baseLinkClass = 'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100';

  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

        <NavLink className={baseLinkClass} to="/PopularProducts">
  <FaBox className="w-5 h-5" />
  <p className="hidden md:block">Add Popular Products</p>
</NavLink>
 <NavLink className={baseLinkClass} to="/PopularProductslist">
  < FaStar  className="w-5 h-5" />
  <p className="hidden md:block">Popular Products List</p>
</NavLink>
 <NavLink className={baseLinkClass} to="/OfferProducts">
  <FaTags className="w-5 h-5" />
  <p className="hidden md:block">Add Offer Products</p>
</NavLink>

<NavLink className={baseLinkClass} to="/OfferProductsList">
  <FaListAlt className="w-5 h-5" />
  <p className="hidden md:block">Offer Products List</p>
</NavLink>
<NavLink className={baseLinkClass} to="/DeskDecoratives">
  <FaPlusCircle className="w-5 h-5" />
  <p className="hidden md:block">Desk Decoratives</p>
</NavLink>
<NavLink className={baseLinkClass} to="/DeskDecorativesList">
  <FaList className="w-5 h-5" />
  <p className="hidden md:block">Desk Decoratives List</p>
</NavLink>
<NavLink className={baseLinkClass} to="/WallDecoratives">
          <FaBox className='w-5 h-5' />
          <p className='hidden md:block'>Wall Decoratives</p>
        </NavLink>
<NavLink className={baseLinkClass} to="/WallDecorativesList">
          <FaBox className='w-5 h-5' />
          <p className='hidden md:block'>Wall Decoratives List</p>
        </NavLink>
<NavLink className={baseLinkClass} to="/CarDecoratives">
          <FaEnvelope className='w-5 h-5' />
          <p className='hidden md:block'>Car Decoratives</p>
        </NavLink>
<NavLink className={baseLinkClass} to="/CarDecorativesList">
          <FaThList className='w-5 h-5' />
          <p className='hidden md:block'>Car Decoratives List</p>
        </NavLink>


        <NavLink className={baseLinkClass} to="/add">
          <FaPlusCircle className='w-5 h-5' />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink className={baseLinkClass} to="/list">
          <FaList className='w-5 h-5' />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink className={baseLinkClass} to="/orders">
          <FaShoppingCart className='w-5 h-5' />
          <p className='hidden md:block'>Orders</p>
        </NavLink>

        <NavLink className={baseLinkClass} to="/slidesAdding">
          <FaImages className='w-5 h-5' />
          <p className='hidden md:block'>Slides</p>
        </NavLink>

        <NavLink className={baseLinkClass} to="/SlidesList">
          <FaClipboardList className='w-5 h-5' />
          <p className='hidden md:block'>Slides List</p>
        </NavLink>

        <NavLink className={baseLinkClass} to="/catagereAdd">
          <FaThLarge className='w-5 h-5' />
          <p className='hidden md:block'>Catagere Image</p>
        </NavLink>

        <NavLink className={baseLinkClass} to="/catagereList">
          <FaThList className='w-5 h-5' />
          <p className='hidden md:block'>Catagere List</p>
        </NavLink>

<NavLink className={baseLinkClass} to="/businessNeeds">
          <FaFolderOpen className='w-5 h-5' />
          <p className='hidden md:block'>Business Needs</p>
        </NavLink>

<NavLink className={baseLinkClass} to="/businessNeedsList">
          <FaFolderOpen className='w-5 h-5' />
          <p className='hidden md:block'>Business Needs List</p>
        </NavLink>
<NavLink className={baseLinkClass} to="/GoogleReviewAdd">
    <FaStar className='w-5 h-5' />  {/* Star icon for a single review */}
    <p className='hidden md:block'>Google Review</p>
</NavLink>

<NavLink className={baseLinkClass} to="/GoogleReviewList">
    <FaListAlt className='w-5 h-5' />  {/* List icon for multiple reviews */}
    <p className='hidden md:block'>Google Review List</p>
</NavLink>

        <NavLink className={baseLinkClass} to="/manageCategory">
          <FaFolderOpen className='w-5 h-5' />
          <p className='hidden md:block'>Manage Categere</p>
        </NavLink>

        <NavLink className={baseLinkClass} to="/enquiries">
          <FaEnvelope className='w-5 h-5' />
          <p className='hidden md:block'>Enquiries</p>
        </NavLink>

        <Link to="/admin/keywords" className={`${baseLinkClass} hover:text-blue-600`}>
          <FaKey className='w-5 h-5' />
          <p className='hidden md:block'>Keyword Manager</p>
        </Link>
        <Link to="/admin/users" className={`${baseLinkClass} hover:text-blue-600`}>
          <FaKey className='w-5 h-5' />
          <p className='hidden md:block'>Admin Users</p>
        </Link>  

      </div>
    </div>
  );
};

export default Sidebar;
