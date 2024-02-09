import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#fff] py-10 rounded-md flex items-center justify-between px-12 text-black shadow-2xl border text-2xl border-blue-400">
      <Link to="/">Book List</Link>
      <div>|||</div>
    </div>
  );
};

export default Navbar;
