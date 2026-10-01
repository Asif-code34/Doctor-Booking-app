// import { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const DoctorAppointments = () => {
//   const {
//     dToken,
//     appointments,
//     getAppointments,
//     completeAppointment,
//     cancelAppointment,
//   } = useContext(DoctorContext);
//   const { calculateAge } = useContext(AppContext);

//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//   }, [dToken]);
//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All appointments</p>
//       <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
//         <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
//           <p>#</p>
//           <p>Pateint</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date &Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>
//         {[...appointments].reverse().map((item, index) => {
//           return (
//             <div
//               key={index}
//               className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
//             >
//               <p className="max-sm:hidden">{index + 1}</p>
//               <div className="flex items-center gap-2">
//                 <img
//                   className="w-8 rounded-full"
//                   src={item.userData.image}
//                   alt=""
//                 />{" "}
//                 <p className="text-xs inline border border-primary px-2 rounded-full">
//                   {item.userData.name}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs inline border border-primary px-2 rounded-full">
//                   {item.payment ? "Online" : "Cash"}
//                 </p>
//               </div>
//               <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
//               <p>
//                 {item.slotDate},{item.slotTime}
//               </p>
//               <p>${item.amount}</p>
//               {item.cancelled ? (
//                 <p className="text-red-400 text-xs font-medium">Cancelled</p>
//               ) : item.isCompleted ? (
//                 <p className="text-green-400 text-xs font-medium">Completed</p>
//               ) : (
//                 <div className="flex gap-2 items-center">
//                   <img
//                     onClick={() => cancelAppointment(item._id)}
//                     className="w-10 cursor-pointer"
//                     src={assets.cancel_icon}
//                     alt=""
//                   />
//                   <img
//                     onClick={() => completeAppointment(item._id)}
//                     className="w-10 cursor-pointer"
//                     src={assets.tick_icon}
//                     alt=""
//                   />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;

import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <main className="min-w-0 flex-1 w-full overflow-x-hidden">
      {" "}
      <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-7">
        {" "}
        {/* Page Header */}{" "}
        <div className="mb-5">
          {" "}
          <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
            {" "}
            All Appointments{" "}
          </h1>{" "}
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {" "}
            Manage your patient appointments{" "}
          </p>{" "}
        </div>{" "}
        {/* Appointments Container */}{" "}
        <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {" "}
          {/* ================= DESKTOP HEADER ================= */}{" "}
          <div className=" hidden border-b bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-600 lg:grid lg:grid-cols-[0.4fr_2fr_1fr_0.8fr_2.2fr_1fr_1.2fr] lg:items-center lg:gap-3 xl:px-6 ">
            {" "}
            <p>#</p> <p>Patient</p> <p>Payment</p> <p>Age</p> <p>Date & Time</p>{" "}
            <p>Fees</p> <p>Action</p>{" "}
          </div>{" "}
          {/* ================= APPOINTMENTS ================= */}{" "}
          {appointments?.length > 0 ? (
            [...appointments].reverse().map((item, index) => {
              return (
                <div key={index}>
                  {" "}
                  {/* ================= DESKTOP ROW ================= */}{" "}
                  <div className=" hidden border-b px-4 py-4 text-sm text-gray-500 transition-colors hover:bg-gray-50 lg:grid lg:grid-cols-[0.4fr_2fr_1fr_0.8fr_2.2fr_1fr_1.2fr] lg:items-center lg:gap-3 xl:px-6 ">
                    {" "}
                    {/* Number */} <p>{index + 1}</p> {/* Patient */}{" "}
                    <div className="flex min-w-0 items-center gap-2">
                      {" "}
                      <img
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                        src={item.userData.image}
                        alt={item.userData.name}
                      />{" "}
                      <p
                        className=" min-w-0 truncate text-xs font-medium text-gray-700 "
                        title={item.userData.name}
                      >
                        {" "}
                        {item.userData.name}{" "}
                      </p>{" "}
                    </div>{" "}
                    {/* Payment */}{" "}
                    <div>
                      {" "}
                      <span className="inline-flex rounded-full border border-primary px-2.5 py-1 text-[11px] font-medium text-gray-600">
                        {" "}
                        {item.payment ? "Online" : "Cash"}{" "}
                      </span>{" "}
                    </div>{" "}
                    {/* Age */} <p> {calculateAge(item.userData.dob)} </p>{" "}
                    {/* Date & Time */}{" "}
                    <div className="min-w-0">
                      {" "}
                      <p className="truncate text-xs text-gray-600">
                        {" "}
                        {item.slotDate}{" "}
                      </p>{" "}
                      <p className="mt-0.5 text-xs text-gray-400">
                        {" "}
                        {item.slotTime}{" "}
                      </p>{" "}
                    </div>{" "}
                    {/* Fees */}{" "}
                    <p className="font-medium text-gray-700">
                      {" "}
                      ${item.amount}{" "}
                    </p>{" "}
                    {/* Action */}{" "}
                    <div>
                      {" "}
                      {item.cancelled ? (
                        <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-500">
                          {" "}
                          Cancelled{" "}
                        </span>
                      ) : item.isCompleted ? (
                        <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-500">
                          {" "}
                          Completed{" "}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          {" "}
                          <button
                            type="button"
                            onClick={() => cancelAppointment(item._id)}
                            className=" flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 "
                            aria-label={`Cancel appointment for ${item.userData.name}`}
                          >
                            {" "}
                            <img
                              src={assets.cancel_icon}
                              alt=""
                              aria-hidden="true"
                              className="h-8 w-8 object-contain"
                            />{" "}
                          </button>{" "}
                          <button
                            type="button"
                            onClick={() => completeAppointment(item._id)}
                            className=" flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200 "
                            aria-label={`Complete appointment for ${item.userData.name}`}
                          >
                            {" "}
                            <img
                              src={assets.tick_icon}
                              alt=""
                              aria-hidden="true"
                              className="h-8 w-8 object-contain"
                            />{" "}
                          </button>{" "}
                        </div>
                      )}{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* ================= MOBILE CARD ================= */}{" "}
                  <div className=" border-b p-4 transition-colors hover:bg-gray-50 lg:hidden ">
                    {" "}
                    {/* Patient Header */}{" "}
                    <div className="flex min-w-0 items-center gap-3">
                      {" "}
                      <img
                        className="h-11 w-11 shrink-0 rounded-full object-cover"
                        src={item.userData.image}
                        alt={item.userData.name}
                      />{" "}
                      <div className="min-w-0 flex-1">
                        {" "}
                        <p
                          className="truncate text-sm font-semibold text-gray-800"
                          title={item.userData.name}
                        >
                          {" "}
                          {item.userData.name}{" "}
                        </p>{" "}
                        <p className="mt-0.5 text-xs text-gray-400">
                          {" "}
                          Patient #{index + 1}{" "}
                        </p>{" "}
                      </div>{" "}
                      {/* Status */}{" "}
                      <div className="shrink-0">
                        {" "}
                        {item.cancelled ? (
                          <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-medium text-red-500">
                            {" "}
                            Cancelled{" "}
                          </span>
                        ) : item.isCompleted ? (
                          <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium text-green-500">
                            {" "}
                            Completed{" "}
                          </span>
                        ) : (
                          <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-primary">
                            {" "}
                            Upcoming{" "}
                          </span>
                        )}{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Appointment Details */}{" "}
                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                      {" "}
                      {/* Payment */}{" "}
                      <div className="min-w-0">
                        {" "}
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                          {" "}
                          Payment{" "}
                        </p>{" "}
                        <span className="mt-1 inline-flex rounded-full border border-primary px-2 py-0.5 text-[10px] font-medium text-gray-600">
                          {" "}
                          {item.payment ? "Online" : "Cash"}{" "}
                        </span>{" "}
                      </div>{" "}
                      {/* Age */}{" "}
                      <div>
                        {" "}
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                          {" "}
                          Age{" "}
                        </p>{" "}
                        <p className="mt-1 text-xs font-medium text-gray-700">
                          {" "}
                          {calculateAge(item.userData.dob)}{" "}
                        </p>{" "}
                      </div>{" "}
                      {/* Date */}{" "}
                      <div className="min-w-0">
                        {" "}
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                          {" "}
                          Date{" "}
                        </p>{" "}
                        <p className="mt-1 truncate text-xs font-medium text-gray-700">
                          {" "}
                          {item.slotDate}{" "}
                        </p>{" "}
                      </div>{" "}
                      {/* Time */}{" "}
                      <div>
                        {" "}
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                          {" "}
                          Time{" "}
                        </p>{" "}
                        <p className="mt-1 text-xs font-medium text-gray-700">
                          {" "}
                          {item.slotTime}{" "}
                        </p>{" "}
                      </div>{" "}
                      {/* Fees */}{" "}
                      <div>
                        {" "}
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                          {" "}
                          Fees{" "}
                        </p>{" "}
                        <p className="mt-1 text-xs font-semibold text-gray-700">
                          {" "}
                          ${item.amount}{" "}
                        </p>{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Mobile Actions */}{" "}
                    {!item.cancelled && !item.isCompleted && (
                      <div className="mt-4 flex gap-2 border-t pt-3">
                        {" "}
                        <button
                          type="button"
                          onClick={() => cancelAppointment(item._id)}
                          className=" flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 "
                        >
                          {" "}
                          <img
                            src={assets.cancel_icon}
                            alt=""
                            aria-hidden="true"
                            className="h-5 w-5"
                          />{" "}
                          Cancel{" "}
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => completeAppointment(item._id)}
                          className=" flex flex-1 items-center justify-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-xs font-medium text-green-600 transition-colors hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 "
                        >
                          {" "}
                          <img
                            src={assets.tick_icon}
                            alt=""
                            aria-hidden="true"
                            className="h-5 w-5"
                          />{" "}
                          Complete{" "}
                        </button>{" "}
                      </div>
                    )}{" "}
                  </div>{" "}
                </div>
              );
            })
          ) : (
            /* Empty State */ <div className="flex min-h-[300px] items-center justify-center px-4 text-center">
              {" "}
              <div>
                {" "}
                <p className="text-sm font-medium text-gray-600">
                  {" "}
                  No appointments found{" "}
                </p>{" "}
                <p className="mt-1 text-xs text-gray-400">
                  {" "}
                  Your appointments will appear here.{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
};
export default DoctorAppointments;
