// import React, { useContext } from "react";

// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { AdminContext } from "../context/AdminContext";
// import { DoctorContext } from "../context/DoctorContext";

// const Navbar = () => {
//   const { aToken, setAToken } = useContext(AdminContext);
//   const { dToken, setDToken } = useContext(DoctorContext);

//   const navigate = useNavigate();

//   // const logout = () => {
//   //   navigate("/");
//   //   aToken && setAToken("");
//   //   aToken && localStorage.removeItem("aToken");
//   //   dToken && setDToken("");
//   //   dToken && localStorage.removeItem("dToken");
//   // };
//   const logout = () => {
//     setAToken("");
//     setDToken("");

//     localStorage.removeItem("aToken");
//     localStorage.removeItem("dToken");

//     navigate("/");
//   };

//   return (
//     <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
//       <div className="flex items-center gap-2 text-xs">
//         <img
//           className="w-36 sm:w-40 cursor-pointer"
//           src={assets.admin_logo}
//           alt=""
//         />
//         <p className="border px-2.5 py-0.5 rounded-full border-gray-500">
//           {aToken ? "Admin" : "Doctor"}
//         </p>
//       </div>
//       <button
//         className="bg-primary text-white text-sm px-10 py-2 rounded-full"
//         onClick={() => logout()}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    setAToken("");
    setDToken("");

    localStorage.removeItem("aToken");
    localStorage.removeItem("dToken");

    navigate("/");
  };

  return (
    <header className="flex items-center justify-between gap-3 border-b bg-white px-4 py-3 sm:px-6 lg:px-10">
      {/* Logo + Role */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <img
          src={assets.admin_logo}
          alt="MediSlot"
          className="w-28 sm:w-36 lg:w-40 h-auto cursor-pointer object-contain"
        />

        <span className="shrink-0 rounded-full border border-gray-300 bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-600 sm:px-3 sm:text-xs">
          {aToken ? "Admin" : "Doctor"}
        </span>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={logout}
        className="
          shrink-0
          rounded-full
          bg-primary
          px-5 py-2
          text-xs font-medium text-white
          transition-all duration-200
          hover:opacity-90
          focus:outline-none
          focus:ring-2
          focus:ring-primary
          focus:ring-offset-2
          sm:px-7
          sm:py-2.5
          sm:text-sm
          lg:px-8
        "
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
