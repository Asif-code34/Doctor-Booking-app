// import React, { useContext } from "react";
// import Login from "./pages/login";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AdminContext } from "./context/AdminContext";
// import Navbar from "./component/Navbar";
// import Sidebar from "./component/Sidebar";
// import { Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Admin/Dashboard";
// import AllAppointment from "./pages/Admin/AllAppointment";
// import AddDoctor from "./pages/Admin/AddDoctor";
// import DoctorsList from "./pages/Admin/DoctorsList";
// import { DoctorContext } from "./context/DoctorContext";
// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

// import DoctorProfile from "./pages/Doctor/DoctorProfile";
// import DoctorAppointments from "./pages/Doctor/DoctorAppointments";

// const App = () => {
//   const { aToken } = useContext(AdminContext);
//   const { dToken } = useContext(DoctorContext);

//   return aToken || dToken ? (
//     <div className="bg-[#F8F9FD]">
//       <ToastContainer />
//       <Navbar />
//       <div className="flex items-start">
//         <Sidebar />
//         <Routes>
//           {/*Admin Route */}
//           <Route path="/" element={<></>} />
//           <Route path="/admin-dashboard" element={<Dashboard />} />
//           <Route path="/all-appointments" element={<AllAppointment />} />
//           <Route path="/add-doctor" element={<AddDoctor />} />
//           <Route path="/doctor-list" element={<DoctorsList />} />
//           {/*doctor Route */}
//           <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
//           <Route path="/doctor-appointments" element={<DoctorAppointments />} />
//           <Route path="/doctor-profile" element={<DoctorProfile />} />
//         </Routes>
//       </div>
//     </div>
//   ) : (
//     <>
//       <Login />
//       <ToastContainer />
//     </>
//   );
// };

// export default App;

import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/login";

import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";

import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

// Doctor Pages
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // If neither Admin nor Doctor is logged in
  if (!aToken && !dToken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />

      <Navbar />

      <div className="flex items-start">
        <Sidebar />

        <Routes>
          {/* ================= ADMIN ROUTES ================= */}
          {aToken ? (
            <>
              <Route
                path="/"
                element={<Navigate to="/admin-dashboard" replace />}
              />

              <Route path="/admin-dashboard" element={<Dashboard />} />

              <Route path="/all-appointments" element={<AllAppointment />} />

              <Route path="/add-doctor" element={<AddDoctor />} />

              <Route path="/doctor-list" element={<DoctorsList />} />

              {/* If Admin tries to open any Doctor URL manually */}
              <Route
                path="*"
                element={<Navigate to="/admin-dashboard" replace />}
              />
            </>
          ) : (
            /* ================= DOCTOR ROUTES ================= */
            <>
              <Route
                path="/"
                element={<Navigate to="/doctor-dashboard" replace />}
              />

              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

              <Route
                path="/doctor-appointments"
                element={<DoctorAppointments />}
              />

              <Route path="/doctor-profile" element={<DoctorProfile />} />

              {/* If Doctor tries to open any Admin URL manually */}
              <Route
                path="*"
                element={<Navigate to="/doctor-dashboard" replace />}
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
