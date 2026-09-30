// import { NavLink, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useContext, useState } from "react";
// import { AppContext } from "../context/AppContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const { token, setToken, userData } = useContext(AppContext);

//   const logout = () => {
//     setToken(false);
//     localStorage.removeItem("token");
//   };
//   return (
//     <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
//       <img
//         onClick={() => navigate("/")}
//         className="w-44 cursor-pointer"
//         src={assets.logo}
//         alt=""
//       />
//       <ul className="hidden md:flex items-start gap-5 font-medium">
//         <NavLink to="/">
//           <li className="py-1">Home</li>
//           <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
//         </NavLink>
//         <NavLink to="/doctors">
//           <li className="py-1">All-Doctors</li>
//           <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
//         </NavLink>
//         <NavLink to="/about">
//           <li className="py-1">About</li>
//           <hr className="border-none outline-none h-0.5  bg-cyan-500 w-3/5 m-auto hidden" />
//         </NavLink>
//         <NavLink to="/contact">
//           <li className="py-1">Contact</li>
//           <hr
//             className="border-none outline-none h-0.5 bg-primary
//            w-3/5 m-auto hidden"
//           />
//         </NavLink>
//       </ul>
//       <div className="flex items-center gap-4">
//         {token ? (
//           <div className="flex items-center gap-2 cursor-pointer group relative">
//             <img className="w-8 rounded-full" src={userData.image} alt="" />
//             <img className="w-2.5" src={assets.dropdown_icon} alt="" />
//             <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
//               <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
//                 <p
//                   onClick={() => navigate("/my-profile")}
//                   className="hover:text-black cursor-pointer"
//                 >
//                   My Profile
//                 </p>
//                 <p
//                   onClick={() => navigate("/my-appointment")}
//                   className="hover:text-black cursor-pointer"
//                 >
//                   My Appointment
//                 </p>
//                 <p onClick={logout} className="hover:text-black cursor-pointer">
//                   Logout
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className=" text-white bg-primary px-8 py-3 rounded-full font-dark hidden md:block"
//           >
//             Create Account
//           </button>
//         )}
//         <img
//           onClick={() => setShowMenu(true)}
//           className="w-6 md:hidden"
//           src={assets.menu_icon}
//           alt=""
//         />
//         {/*---mobile menu -----*/}
//         <div
//           className={`${
//             showMenu ? "fixed w-full" : "h-0 w-0"
//           }md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
//         >
//           <div className="flex items-center justify-between px-5 py-6">
//             <img className="w-36" src={assets.logo} alt="" />
//             <img
//               className="w-7"
//               onClick={() => setShowMenu(false)}
//               src={assets.cross_icon}
//               alt=""
//             />
//           </div>
//           <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-mediuL">
//             <NavLink
//               className="px-4 py-2 rounded  inline-block"
//               onClick={() => setShowMenu(false)}
//               to="/"
//             >
//               <p className="px-4 py-2 rounded  inline-block"> HOme</p>
//             </NavLink>
//             <NavLink
//               className="px-4 py-2 rounded inline-block"
//               onClick={() => setShowMenu(false)}
//               to="/doctors"
//             >
//               <p className="px-4 py-2 rounded  inline-block"> Doctors</p>
//             </NavLink>
//             <NavLink
//               className="px-4 py-2 rounded inline-block"
//               onClick={() => setShowMenu(false)}
//               to="/about"
//             >
//               <p className="px-4 py-2 rounded  inline-block"> About</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to="/contact">
//               <p className="px-4 py-2 rounded  inline-block"> Contact</p>
//             </NavLink>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowMenu(false);
    navigate("/");
  };

  const closeMobileMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-36 sm:w-44 cursor-pointer"
        src={assets.logo}
        alt="Doctor Booking"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token ? (
          /* Logged-in user */
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer"
              aria-label="Open profile menu"
            >
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={userData?.image || assets.profile_pic}
                alt="Profile"
              />

              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            </button>

            {/* Desktop profile dropdown */}
            <div className="absolute top-0 right-0 pt-12 z-30 hidden group-hover:block">
              <div className="min-w-48 bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col gap-3 p-4 text-base font-medium text-gray-600">
                <button
                  type="button"
                  onClick={() => navigate("/my-profile")}
                  className="text-left hover:text-black transition-colors"
                >
                  My Profile
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/my-appointment")}
                  className="text-left hover:text-black transition-colors"
                >
                  My Appointments
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="text-left hover:text-black transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Login button */
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block text-white bg-primary px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
        )}

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setShowMenu(true)}
          className="md:hidden"
          aria-label="Open navigation menu"
        >
          <img className="w-6" src={assets.menu_icon} alt="" />
        </button>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-50 bg-white transition-transform duration-300 md:hidden ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile menu header */}
          <div className="flex items-center justify-between px-5 py-6 border-b">
            <img className="w-36" src={assets.logo} alt="Doctor Booking" />

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
            >
              <img className="w-7" src={assets.cross_icon} alt="" />
            </button>
          </div>

          {/* Mobile navigation */}
          <ul className="flex flex-col items-center gap-3 mt-8 px-5 text-lg font-medium">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className="w-full max-w-xs text-center"
            >
              <p className="px-4 py-3 rounded-lg">Home</p>
            </NavLink>

            <NavLink
              to="/doctors"
              onClick={closeMobileMenu}
              className="w-full max-w-xs text-center"
            >
              <p className="px-4 py-3 rounded-lg">Doctors</p>
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className="w-full max-w-xs text-center"
            >
              <p className="px-4 py-3 rounded-lg">About</p>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMobileMenu}
              className="w-full max-w-xs text-center"
            >
              <p className="px-4 py-3 rounded-lg">Contact</p>
            </NavLink>

            {/* Mobile account options */}
            {token ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/my-profile");
                    closeMobileMenu();
                  }}
                  className="w-full max-w-xs px-4 py-3 rounded-lg text-center"
                >
                  My Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/my-appointment");
                    closeMobileMenu();
                  }}
                  className="w-full max-w-xs px-4 py-3 rounded-lg text-center"
                >
                  My Appointments
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="w-full max-w-xs px-4 py-3 rounded-lg text-center text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  navigate("/login");
                  closeMobileMenu();
                }}
                className="w-full max-w-xs mt-3 px-6 py-3 rounded-full bg-primary text-white"
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
