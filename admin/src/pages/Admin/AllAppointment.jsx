// import React from "react";
// import { useContext } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { useEffect } from "react";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const AllAppointment = () => {
//   const { aToken, appointments, getAllAppointments, cancelAppointment } =
//     useContext(AdminContext);
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken]);
//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">AllAppointment</p>
//       <div className="bg-white border rounded text-sm max-h-[80vh] overflow-scroll min-h-[60vh]">
//         <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
//           <p>#</p>
//           <p>Pateint</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctors</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>
//         {appointments.map((item, index) => {
//           return (
//             <div
//               className="flex flex-wrap justify-between max-sm:gap-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
//               key={index}
//             >
//               <p className="max-sm:hidden">{index + 1}</p>
//               <div className="flex items-center gap-2">
//                 <img
//                   className="w-8 rounded-full"
//                   src={item.userData.image}
//                   alt=""
//                 />{" "}
//                 <p>{item.userData.name}</p>
//               </div>
//               <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
//               <p>
//                 {slotDateFormat(item.slotDate)},{item.slotTime}
//               </p>
//               <div className="flex items-center gap-2">
//                 <img
//                   className="w-8 rounded-full bg-gray-200"
//                   src={item.docData.image}
//                   alt=""
//                 />{" "}
//                 <p>{item.docData.name}</p>
//               </div>
//               <p>
//                 {currency}
//                 {item.amount}
//               </p>
//               {item.cancelled ? (
//                 <p className="text-red-400 text-xs font-medium">Cancelled</p>
//               ) : item.isCompleted ? (
//                 <p className="text-green-500 text-xs font-medium">Completed</p>
//               ) : (
//                 <img
//                   onClick={() => cancelAppointment(item._id)}
//                   className="w-10 cursor-pointer"
//                   src={assets.cancel_icon}
//                   alt=""
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AllAppointment;

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <main className="w-full p-4 sm:p-5 md:p-6">
      <div className="w-full max-w-7xl">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
            All Appointments
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            View and manage all patient appointments.
          </p>
        </div>

        {/* Appointment Container */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Desktop Header */}
          <div
            className="
              hidden
              lg:grid
              lg:grid-cols-[0.4fr_2fr_0.7fr_1.8fr_2fr_1fr_1fr]
              items-center
              gap-4
              border-b
              bg-gray-50
              px-6
              py-3
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-gray-500
            "
          >
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Status</p>
          </div>

          {/* Appointments */}
          <div>
            {appointments && appointments.length > 0 ? (
              appointments.map((item, index) => {
                return (
                  <div
                    key={item._id || index}
                    className="
                      border-b
                      border-gray-100
                      px-4
                      py-4
                      transition-colors
                      last:border-b-0
                      hover:bg-gray-50
                      sm:px-6
                    "
                  >
                    {/* Desktop / Large Screen */}
                    <div
                      className="
                        hidden
                        lg:grid
                        lg:grid-cols-[0.4fr_2fr_0.7fr_1.8fr_2fr_1fr_1fr]
                        items-center
                        gap-4
                        text-sm
                        text-gray-600
                      "
                    >
                      {/* Number */}
                      <p className="text-gray-400">{index + 1}</p>

                      {/* Patient */}
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          className="h-9 w-9 shrink-0 rounded-full bg-gray-100 object-cover"
                          src={item.userData.image}
                          alt={item.userData.name || "Patient"}
                        />

                        <p className="truncate font-medium text-gray-700">
                          {item.userData.name}
                        </p>
                      </div>

                      {/* Age */}
                      <p>{calculateAge(item.userData.dob)}</p>

                      {/* Date & Time */}
                      <div>
                        <p className="font-medium text-gray-700">
                          {slotDateFormat(item.slotDate)}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {item.slotTime}
                        </p>
                      </div>

                      {/* Doctor */}
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          className="h-9 w-9 shrink-0 rounded-full bg-gray-100 object-cover"
                          src={item.docData.image}
                          alt={item.docData.name || "Doctor"}
                        />

                        <p className="truncate font-medium text-gray-700">
                          {item.docData.name}
                        </p>
                      </div>

                      {/* Fees */}
                      <p className="font-medium text-gray-700">
                        {currency}
                        {item.amount}
                      </p>

                      {/* Status */}
                      <div>
                        {item.cancelled ? (
                          <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                            Cancelled
                          </span>
                        ) : item.isCompleted ? (
                          <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                            Completed
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => cancelAppointment(item._id)}
                            className="
                              rounded-full
                              px-2
                              py-1
                              transition
                              hover:bg-red-50
                              focus:outline-none
                              focus:ring-2
                              focus:ring-red-200
                            "
                            aria-label={`Cancel appointment for ${
                              item.userData.name
                            }`}
                            title="Cancel appointment"
                          >
                            <img
                              className="h-7 w-7 object-contain"
                              src={assets.cancel_icon}
                              alt=""
                              aria-hidden="true"
                            />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Mobile / Tablet Card */}
                    <div className="lg:hidden">
                      {/* Top Section */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <img
                            className="h-11 w-11 shrink-0 rounded-full bg-gray-100 object-cover"
                            src={item.userData.image}
                            alt={item.userData.name || "Patient"}
                          />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-800">
                              {item.userData.name}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                              Patient #{index + 1}
                            </p>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="shrink-0">
                          {item.cancelled ? (
                            <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600">
                              Cancelled
                            </span>
                          ) : item.isCompleted ? (
                            <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-600">
                              Completed
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => cancelAppointment(item._id)}
                              className="
                                rounded-full
                                p-1.5
                                transition
                                hover:bg-red-50
                                focus:outline-none
                                focus:ring-2
                                focus:ring-red-200
                              "
                              aria-label={`Cancel appointment for ${
                                item.userData.name
                              }`}
                              title="Cancel appointment"
                            >
                              <img
                                className="h-7 w-7 object-contain"
                                src={assets.cancel_icon}
                                alt=""
                                aria-hidden="true"
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                        {/* Age */}
                        <div>
                          <p className="text-xs text-gray-400">Age</p>
                          <p className="mt-0.5 font-medium text-gray-700">
                            {calculateAge(item.userData.dob)}
                          </p>
                        </div>

                        {/* Fees */}
                        <div>
                          <p className="text-xs text-gray-400">Fees</p>
                          <p className="mt-0.5 font-medium text-gray-700">
                            {currency}
                            {item.amount}
                          </p>
                        </div>

                        {/* Date & Time */}
                        <div>
                          <p className="text-xs text-gray-400">Date & Time</p>
                          <p className="mt-0.5 font-medium text-gray-700">
                            {slotDateFormat(item.slotDate)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.slotTime}
                          </p>
                        </div>

                        {/* Doctor */}
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400">Doctor</p>

                          <div className="mt-1 flex min-w-0 items-center gap-2">
                            <img
                              className="h-7 w-7 shrink-0 rounded-full bg-gray-100 object-cover"
                              src={item.docData.image}
                              alt={item.docData.name || "Doctor"}
                            />

                            <p className="truncate font-medium text-gray-700">
                              {item.docData.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Empty State */
              <div className="flex min-h-[300px] items-center justify-center px-6 py-12 text-center">
                <div>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-xl text-gray-400">📅</span>
                  </div>

                  <h2 className="text-sm font-semibold text-gray-700">
                    No appointments found
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    There are currently no appointments to display.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllAppointment;
