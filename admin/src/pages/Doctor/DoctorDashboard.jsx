// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";

// const DoctorDashboard = () => {
//   const {
//     getDashData,
//     dashData,

//     dToken,
//     cancelAppointment,
//     completeAppointment,
//   } = useContext(DoctorContext);
//   const { currency } = useContext(AppContext);

//   useEffect(() => {
//     if (dToken) {
//       getDashData();
//     }
//   }, [dToken]);
//   return (
//     <div className="m-5">
//       <div className="flex flex-wrap gap-3">
//         <div className="flex items-center border-2 border-gray-100 cursor-pointer gap-2 bg-white p-4 min-w-52 rounded hover:scale-105 transition-all">
//           <img src={assets.earning_icon} />
//           <div>
//             <p className="text-xl font-semibold text-gray-600">
//               {currency} {dashData.earnings}
//             </p>
//             <p className="text-gray-400">Earnings</p>
//           </div>
//         </div>
//         <div className="flex items-center border-2 border-gray-100 cursor-pointer gap-2 bg-white p-4 min-w-52 rounded hover:scale-105 transition-all">
//           <img src={assets.appointment_icon} />:
//           <div>
//             <p className="text-xl font-semibold text-gray-600">
//               {dashData.appointments}
//             </p>
//             <p className="text-gray-400">Appointments</p>
//           </div>
//         </div>
//         <div className="flex items-center border-2 border-gray-100 cursor-pointer gap-2 bg-white p-4 min-w-52 rounded hover:scale-105 transition-all">
//           <img src={assets.patients_icon} />
//           <div>
//             <p className="text-xl font-semibold text-gray-600">
//               {dashData.patients}
//             </p>
//             <p className="text-gray-400">Patients</p>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white">
//         <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
//           <img src={assets.list_icon} alt="" />
//           <p>Latest Bookings</p>
//         </div>
//         <div className="pt-4 border border-t-0">
//           {dashData.latestAppointment?.map((item, index) => {
//             return (
//               <div
//                 className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
//                 key={index}
//               >
//                 <img
//                   className="rounded-full w-10"
//                   src={item.userData.image}
//                   alt=""
//                 />
//                 <div className="flex-1 text-sm">
//                   <p className="text-gray-800 font-medium">
//                     {item.userData.name}
//                   </p>
//                   <p className="text-gray-600">{item.slotDate}</p>
//                 </div>
//                 {item.cancelled ? (
//                   <p className="text-red-400 text-xs font-medium">Cancelled</p>
//                 ) : item.isCompleted ? (
//                   <p className="text-green-400 text-xs font-medium">
//                     Completed
//                   </p>
//                 ) : (
//                   <div className="flex gap-2 items-center">
//                     <img
//                       onClick={() => cancelAppointment(item._id)}
//                       className="w-10 cursor-pointer"
//                       src={assets.cancel_icon}
//                       alt=""
//                     />
//                     <img
//                       onClick={() => completeAppointment(item._id)}
//                       className="w-10 cursor-pointer"
//                       src={assets.tick_icon}
//                       alt=""
//                     />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;

import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
const DoctorDashboard = () => {
  const {
    getDashData,
    dashData,
    dToken,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  if (!dashData) return null;
  return (
    <main className="min-w-0 flex-1 w-full overflow-x-hidden">
      {" "}
      <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-7">
        {" "}
        {/* ================= STATS ================= */}{" "}
        <div className=" grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 ">
          {" "}
          {/* Earnings */}{" "}
          <div className=" flex min-w-0 w-full items-center gap-3 rounded-lg border border-gray-100 bg-white p-3.5 transition-all duration-200 hover:shadow-sm sm:p-4 ">
            {" "}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              {" "}
              <img
                src={assets.earning_icon}
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />{" "}
            </div>{" "}
            <div className="min-w-0">
              {" "}
              <p className="truncate text-lg font-semibold leading-tight text-gray-700 sm:text-xl">
                {" "}
                {currency} {dashData.earnings}{" "}
              </p>{" "}
              <p className="mt-1 text-sm text-gray-400"> Earnings </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Appointments */}{" "}
          <div className=" flex min-w-0 w-full items-center gap-3 rounded-lg border border-gray-100 bg-white p-3.5 transition-all duration-200 hover:shadow-sm sm:p-4 ">
            {" "}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              {" "}
              <img
                src={assets.appointment_icon}
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />{" "}
            </div>{" "}
            <div className="min-w-0">
              {" "}
              <p className="text-lg font-semibold leading-tight text-gray-700 sm:text-xl">
                {" "}
                {dashData.appointments}{" "}
              </p>{" "}
              <p className="mt-1 text-sm text-gray-400"> Appointments </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Patients */}{" "}
          <div className=" flex min-w-0 w-full items-center gap-3 rounded-lg border border-gray-100 bg-white p-3.5 transition-all duration-200 hover:shadow-sm sm:p-4 ">
            {" "}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              {" "}
              <img
                src={assets.patients_icon}
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />{" "}
            </div>{" "}
            <div className="min-w-0">
              {" "}
              <p className="text-lg font-semibold leading-tight text-gray-700 sm:text-xl">
                {" "}
                {dashData.patients}{" "}
              </p>{" "}
              <p className="mt-1 text-sm text-gray-400"> Patients </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* ================= LATEST BOOKINGS ================= */}{" "}
        <section className="mt-6 w-full min-w-0 overflow-hidden rounded-lg bg-white sm:mt-8 md:mt-10">
          {" "}
          {/* Section Header */}{" "}
          <div className="flex min-w-0 items-center gap-2.5 border border-b-0 px-3 py-3.5 sm:px-4 sm:py-4">
            {" "}
            <img
              src={assets.list_icon}
              alt=""
              aria-hidden="true"
              className="h-5 w-5 shrink-0 object-contain"
            />{" "}
            <p className="truncate text-sm font-medium text-gray-700 sm:text-base">
              {" "}
              Latest Bookings{" "}
            </p>{" "}
          </div>{" "}
          {/* Booking List */}{" "}
          <div className="w-full min-w-0 overflow-hidden border">
            {" "}
            {dashData.latestAppointment?.length > 0 ? (
              dashData.latestAppointment.map((item, index) => (
                <div
                  key={item._id || index}
                  className=" flex min-w-0 w-full items-center gap-3 border-b last:border-b-0 px-3 py-3 transition-colors duration-200 hover:bg-gray-50 sm:px-5 sm:py-3.5 "
                >
                  {" "}
                  {/* Patient Image */}{" "}
                  <img
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                    src={item.userData.image}
                    alt={item.userData.name}
                  />{" "}
                  {/* Patient Information */}{" "}
                  <div className="min-w-0 flex-1">
                    {" "}
                    <p
                      className="truncate text-sm font-medium text-gray-800"
                      title={item.userData.name}
                    >
                      {" "}
                      {item.userData.name}{" "}
                    </p>{" "}
                    <p className="truncate text-xs text-gray-500 sm:text-sm">
                      {" "}
                      {item.slotDate}{" "}
                    </p>{" "}
                  </div>{" "}
                  {/* Status / Actions */}{" "}
                  <div className="shrink-0">
                    {" "}
                    {item.cancelled ? (
                      <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-medium text-red-500 sm:px-3 sm:text-xs">
                        {" "}
                        Cancelled{" "}
                      </span>
                    ) : item.isCompleted ? (
                      <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium text-green-500 sm:px-3 sm:text-xs">
                        {" "}
                        Completed{" "}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {" "}
                        {/* Cancel */}{" "}
                        <button
                          type="button"
                          onClick={() => cancelAppointment(item._id)}
                          className=" flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 "
                          aria-label={`Cancel appointment for ${item.userData.name}`}
                        >
                          {" "}
                          <img
                            src={assets.cancel_icon}
                            alt=""
                            aria-hidden="true"
                            className="h-7 w-7 object-contain"
                          />{" "}
                        </button>{" "}
                        {/* Complete */}{" "}
                        <button
                          type="button"
                          onClick={() => completeAppointment(item._id)}
                          className=" flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200 "
                          aria-label={`Complete appointment for ${item.userData.name}`}
                        >
                          {" "}
                          <img
                            src={assets.tick_icon}
                            alt=""
                            aria-hidden="true"
                            className="h-7 w-7 object-contain"
                          />{" "}
                        </button>{" "}
                      </div>
                    )}{" "}
                  </div>{" "}
                </div>
              ))
            ) : (
              <div className="flex min-h-[180px] items-center justify-center px-4 text-center">
                {" "}
                <div>
                  {" "}
                  <p className="text-sm font-medium text-gray-600">
                    {" "}
                    No recent bookings{" "}
                  </p>{" "}
                  <p className="mt-1 text-xs text-gray-400">
                    {" "}
                    Your latest appointments will appear here.{" "}
                  </p>{" "}
                </div>{" "}
              </div>
            )}{" "}
          </div>{" "}
        </section>{" "}
      </div>{" "}
    </main>
  );
};
export default DoctorDashboard;
