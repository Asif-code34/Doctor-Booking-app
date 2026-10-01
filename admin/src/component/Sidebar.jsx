// import React, { useContext } from "react";
// import { AdminContext } from "../context/AdminContext";
// import { NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { DoctorContext } from "../context/DoctorContext";

// const Sidebar = () => {
//   const { aToken } = useContext(AdminContext);
//   const { dToken } = useContext(DoctorContext);
//   return (
//     <div className="min-h-screen bg-white border-r">
//       {aToken && (
//         <ul className="text-[#515151] mt-5">
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
//               }`
//             }
//             to={"/admin-dashboard"}
//           >
//             <img src={assets.home_icon} alt="" />
//             <p className="hidden md:block"> Dashboard</p>
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
//               }`
//             }
//             to={"/all-appointments"}
//           >
//             <img src={assets.appointment_icon} alt="" />
//             <p className="hidden md:block">Appointment</p>
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
//               }`
//             }
//             to={"/add-doctor"}
//           >
//             <img src={assets.add_icon} alt="" />
//             <p className="hidden md:block">Add Doctor</p>
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
//               }`
//             }
//             to={"/doctor-list"}
//           >
//             <img src={assets.people_icon} alt="" />
//             <p className="hidden md:block">Doctor List </p>
//           </NavLink>
//         </ul>
//       )}
//       {dToken && (
//         <ul className="text-[#515151] mt-5">
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
//               }`
//             }
//             to={"/doctor-dashboard"}
//           >
//             <img src={assets.home_icon} alt="" />
//             <p className="hidden md:block"> Dashboard</p>
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
//               }`
//             }
//             to={"/doctor-appointments"}
//           >
//             <img src={assets.appointment_icon} alt="" />
//             <p className="hidden md:block">Appointment</p>
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
//               }`
//             }
//             to={"/doctor-profile"}
//           >
//             <img src={assets.people_icon} alt="" />
//             <p className="hidden md:block">Profile </p>
//           </NavLink>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";

const SidebarLink = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 border-r-4 py-3.5
        px-3 transition-colors duration-200
        md:px-5 lg:px-7 xl:px-9
        ${
          isActive
            ? "border-primary bg-[#F2F3FF] text-primary"
            : "border-transparent hover:bg-gray-50"
        }`
      }
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="h-5 w-5 shrink-0 object-contain"
      />

      <span className="hidden text-sm font-medium md:block">{label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <aside className="min-h-[calc(100vh-73px)] self-stretch shrink-0 border-r bg-white">
      {aToken && (
        <nav className="mt-4 text-[#515151]" aria-label="Admin navigation">
          <SidebarLink
            to="/admin-dashboard"
            icon={assets.home_icon}
            label="Dashboard"
          />

          <SidebarLink
            to="/all-appointments"
            icon={assets.appointment_icon}
            label="Appointments"
          />

          <SidebarLink
            to="/add-doctor"
            icon={assets.add_icon}
            label="Add Doctor"
          />

          <SidebarLink
            to="/doctor-list"
            icon={assets.people_icon}
            label="Doctor List"
          />
        </nav>
      )}

      {dToken && (
        <nav className="mt-4 text-[#515151]" aria-label="Doctor navigation">
          <SidebarLink
            to="/doctor-dashboard"
            icon={assets.home_icon}
            label="Dashboard"
          />

          <SidebarLink
            to="/doctor-appointments"
            icon={assets.appointment_icon}
            label="Appointments"
          />

          <SidebarLink
            to="/doctor-profile"
            icon={assets.people_icon}
            label="Profile"
          />
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
