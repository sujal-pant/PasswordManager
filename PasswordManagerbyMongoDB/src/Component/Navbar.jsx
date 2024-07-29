import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-600 flex  justify-around  items-center h-10 text-white">
      <div className="logo font-bold px-4 text-2xl">
        <span className="text-green-400">&lt;</span>
        <span> Password</span>
        <span className="text-green-400">/Manager&gt;</span>
      </div>
      <ul>
        {/* <li className="flex gap-4">
          <a href className="hover:font-bold cursor-pointer">
            Home
          </a>
          <a href className="hover:font-bold cursor-pointer">
            About
          </a>
          <a href className="hover:font-bold cursor-pointer">
            Store
          </a>
        </li> */}
       
      </ul>
      <div>
        < button className="text-white  rounded-md flex gap-2 ring-white ring-1">
        <img width={25} className="invert "src="/externalcontent/github.svg" alt="" />
        <a href="https://github.com/sujal-pant">GitHub</a></button>
      </div>
      
    </nav>
  );
};

export default Navbar;
