"use client"
import React from "react";
import Link from "next/link";
import axiosInstance from "../../../../axiosInstance";

const categories = ["all", "health", "science", "entertainment","buisness","sports"];

const Navbar = () => {
  const fetchCategoryNews = async (category: string) => {
    let tempCategory = category
    if(tempCategory == "all"){
      return
    }
    try {
      const response = await axiosInstance.get(`http://localhost:8000/api/news/category/${tempCategory}`);
      console.log(`News for category ${tempCategory}:`, response.data);
      // Handle setting news data state in the parent component (e.g., AllNews)
    } catch (error) {
      console.error(`Error fetching news for category ${tempCategory}:`, error);
    }
  };

  return (
    <nav className="mt-4 flex justify-center flex-col sm:flex-row items-center gap-8 text-gray-500 font-semibold">
      {categories.map((category, index) => (
        <NavItem key={index} category={category} onClick={fetchCategoryNews} />
      ))}
    </nav>
  );
};

interface NavItemProps {
  category: string;
  onClick: (category: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ category, onClick }) => {
  const handleClick = () => {
    onClick(category);
  };

  return (
    <button className="button hover:text-orange-500 cursor-pointer" onClick={()=> handleClick}>
      {category.charAt(0).toUpperCase() + category.slice(1)}sss
    </button>
  );
};

export default Navbar;
