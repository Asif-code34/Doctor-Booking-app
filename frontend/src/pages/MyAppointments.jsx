// // import React, { useContext, useEffect, useState } from "react";
// // import { AppContext } from "../context/AppContext";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useNavigate } from "react-router-dom";

// // const MyAppointments = () => {
// //   const { backendUrl, token, getDoctorsData } = useContext(AppContext);
// //   const navigate = useNavigate();
// //   const [appointments, setAppointments] = useState([]);
// //   const months = [
// //     " ",
// //     "Jan",
// //     "Feb",
// //     "Mar",
// //     "Apr",
// //     "May",
// //     "June",
// //     "jul",
// //     "Aug",
// //     "Sep",
// //     "Oct",
// //     "Nov",
// //     "Dec",
// //   ];
// //   const slotDateFormat = (slotDate) => {
// //     const dateArray = slotDate.split("_");
// //     return (
// //       dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
// //     );
// //   };

// //   const getUserAppointments = async () => {
// //     try {
// //       const { data } = await axios.get(backendUrl + "/api/user/appointments", {
// //         headers: { token },
// //       });
// //       if (data.success) {
// //         setAppointments(data.appointments.reverse());
// //         console.log(data.appointments);
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error(error.message);
// //     }
// //   };
// //   const cancelAppointment = async (appointmentId) => {
// //     try {
// //       const { data } = await axios.post(
// //         backendUrl + "/api/user/cancel-appointment",
// //         { appointmentId },
// //         { headers: { token } },
// //       );
// //       if (data.success) {
// //         toast.success(data.message);
// //         getUserAppointments();
// //         getDoctorsData();
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error(error.message);
// //     }
// //   };
// //   useEffect(() => {
// //     if (token) {
// //       getUserAppointments();
// //     }
// //   }, [token]);

// //   const initPay = (order) => {
// //     const options = {
// //       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// //       amount: order.amount,
// //       currency: order.currency,
// //       name: "Appointment Payment",
// //       description: "Appointment Payment",
// //       order_id: order.id,
// //       receipt: order.receipt,
// //       handler: async (response) => {
// //         console.log(response);
// //         try {
// //           const { data } = await axios.post(
// //             backendUrl + "/api/user/verifyRazorpay",
// //             response,
// //             { headers: { token } },
// //           );
// //           if (data.success) {
// //             getUserAppointments();
// //             navigate("/my-appointments");
// //           }
// //         } catch (error) {
// //           console.log(error);
// //           toast.error(error.message);
// //         }
// //       },
// //     };
// //     const rzp = new window.Razorpay(options);
// //     rzp.open();
// //   };

// //   const appointmentRazorpay = async (appointmentId) => {
// //     try {
// //       const { data } = await axios.post(
// //         backendUrl + "/api/user/payment-razorpay",
// //         { appointmentId },
// //         { headers: { token } },
// //       );
// //       if (data.success) {
// //         initPay(data.order);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error(error.message);
// //     }
// //   };

// //   return (
// //     <div>
// //       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
// //         My appointments
// //       </p>
// //       <div>
// //         {appointments.map((item, index) => (
// //           <div
// //             key={index}
// //             className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
// //           >
// //             <div>
// //               <img
// //                 className="w-52 bg-indigo-50"
// //                 src={item.docData.image}
// //                 alt=""
// //               />
// //             </div>
// //             <div className="flex-1 text-sm text-zinc-600">
// //               <p className="text-neutral-800 font-semibold">
// //                 {item.docData.name}
// //               </p>
// //               <p>{item.docData.speciality}</p>
// //               <p className="text-zinc-700 font-medium mt-1">Address:</p>
// //               <p className="text-xs">{item.docData.address.line1}</p>
// //               <p className="text-xs">{item.docData.address.line2}</p>
// //               <p className="text-sm mt-1">
// //                 <span className="text-sm text-neutral-700 font-medium">
// //                   Date & Time:
// //                 </span>
// //                 {slotDateFormat(item.slotDate)} | {item.slotTime}
// //               </p>
// //             </div>
// //             <div></div>
// //             <div className="flex flex-col justify-end">
// //               {!item.cancelled && item.payment && !item.isCompleted && (
// //                 <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
// //                   Paid
// //                 </button>
// //               )}
// //               {!item.cancelled && !item.payment && !item.isCompleted && (
// //                 <button
// //                   onClick={() => {
// //                     appointmentRazorpay(item._id);
// //                   }}
// //                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300"
// //                 >
// //                   Pay Online
// //                 </button>
// //               )}
// //               {!item.cancelled && !item.isCompleted && (
// //                 <button
// //                   onClick={() => {
// //                     cancelAppointment(item._id);
// //                   }}
// //                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border mt-2 hover:bg-red-600 hover:text-white transition-all duration-300 "
// //                 >
// //                   Cancel appointment
// //                 </button>
// //               )}
// //               {item.cancelled && !item.isCompleted && (
// //                 <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
// //                   Appointment Cancel
// //                 </button>
// //               )}
// //               {item.isCompleted && (
// //                 <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
// //                   Completed
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyAppointments;

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyAppointments = () => {
//   const { backendUrl, token, getDoctorsData } = useContext(AppContext);

//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [payingAppointment, setPayingAppointment] = useState(null);

//   const months = [
//     "",
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "June",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const slotDateFormat = (slotDate) => {
//     if (!slotDate) return "";

//     const dateArray = slotDate.split("_");

//     return (
//       dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
//     );
//   };

//   // Get user appointments
//   const getUserAppointments = async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.get(backendUrl + "/api/user/appointments", {
//         headers: { token },
//       });

//       if (data.success) {
//         // Do not mutate API response with reverse()
//         const sortedAppointments = [...(data.appointments || [])].reverse();

//         setAppointments(sortedAppointments);

//         console.log("Appointments:", sortedAppointments);
//       } else {
//         toast.error(data.message || "Failed to load appointments");
//       }
//     } catch (error) {
//       console.error("Get appointments error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to load appointments",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Cancel appointment
//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/user/cancel-appointment",
//         { appointmentId },
//         { headers: { token } },
//       );

//       if (data.success) {
//         toast.success(data.message);

//         await getUserAppointments();
//         await getDoctorsData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Cancel appointment error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to cancel appointment",
//       );
//     }
//   };

//   // Razorpay payment
//   const initPay = (order, appointmentId) => {
//     if (!window.Razorpay) {
//       toast.error("Razorpay checkout failed to load");
//       setPayingAppointment(null);
//       return;
//     }

//     const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

//     if (!razorpayKey) {
//       toast.error("Razorpay configuration is missing");
//       setPayingAppointment(null);
//       return;
//     }

//     const options = {
//       key: razorpayKey,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Appointment Payment",
//       description: "Appointment Payment",
//       order_id: order.id,
//       receipt: order.receipt,

//       handler: async (response) => {
//         console.log("Razorpay payment response:", response);

//         try {
//           const { data } = await axios.post(
//             backendUrl + "/api/user/verifyRazorpay",
//             response,
//             {
//               headers: { token },
//             },
//           );

//           console.log("Payment verification response:", data);

//           if (data.success) {
//             toast.success("Payment successful");

//             // Refresh appointments AFTER payment verification
//             await getUserAppointments();

//             // Refresh doctor slots/data
//             await getDoctorsData();

//             setPayingAppointment(null);
//           } else {
//             toast.error(data.message || "Payment verification failed");
//             setPayingAppointment(null);
//           }
//         } catch (error) {
//           console.error("Payment verification error:", error);

//           toast.error(
//             error.response?.data?.message ||
//               error.message ||
//               "Payment verification failed",
//           );

//           setPayingAppointment(null);
//         }
//       },

//       modal: {
//         ondismiss: () => {
//           setPayingAppointment(null);
//         },
//       },

//       theme: {
//         color: "#5F6FFF",
//       },
//     };

//     const rzp = new window.Razorpay(options);

//     rzp.on("payment.failed", (response) => {
//       console.error("Razorpay payment failed:", response);

//       toast.error(response.error?.description || "Payment failed");

//       setPayingAppointment(null);
//     });

//     rzp.open();
//   };

//   // Create Razorpay order
//   const appointmentRazorpay = async (appointmentId) => {
//     try {
//       setPayingAppointment(appointmentId);

//       const { data } = await axios.post(
//         backendUrl + "/api/user/payment-razorpay",
//         { appointmentId },
//         {
//           headers: { token },
//         },
//       );

//       console.log("Razorpay order response:", data);

//       if (data.success) {
//         initPay(data.order, appointmentId);
//       } else {
//         toast.error(data.message || "Unable to create payment order");
//         setPayingAppointment(null);
//       }
//     } catch (error) {
//       console.error("Create Razorpay order error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           "Unable to create payment order",
//       );

//       setPayingAppointment(null);
//     }
//   };

//   // Load appointments
//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     } else {
//       setAppointments([]);
//       setLoading(false);
//     }
//   }, [token]);

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My appointments
//       </p>

//       {loading ? (
//         <div className="py-10 text-center text-zinc-500">
//           Loading appointments...
//         </div>
//       ) : appointments.length === 0 ? (
//         <div className="py-10 text-center text-zinc-500">
//           No appointments found.
//         </div>
//       ) : (
//         <div>
//           {appointments.map((item) => (
//             <div
//               key={item._id}
//               className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
//             >
//               {/* Doctor image */}
//               <div>
//                 <img
//                   className="w-52 bg-indigo-50"
//                   src={item.docData?.image || "/default-doctor.png"}
//                   alt={item.docData?.name || "Doctor"}
//                 />
//               </div>

//               {/* Doctor information */}
//               <div className="flex-1 text-sm text-zinc-600">
//                 <p className="text-neutral-800 font-semibold">
//                   {item.docData?.name || "Doctor"}
//                 </p>

//                 <p>{item.docData?.speciality || "Speciality not available"}</p>

//                 <p className="text-zinc-700 font-medium mt-1">Address:</p>

//                 <p className="text-xs">{item.docData?.address?.line1 || ""}</p>

//                 <p className="text-xs">{item.docData?.address?.line2 || ""}</p>

//                 <p className="text-sm mt-1">
//                   <span className="text-sm text-neutral-700 font-medium">
//                     Date & Time:
//                   </span>{" "}
//                   {slotDateFormat(item.slotDate)} | {item.slotTime}
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col justify-end">
//                 {/* Paid */}
//                 {!item.cancelled && item.payment && !item.isCompleted && (
//                   <button
//                     disabled
//                     className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50"
//                   >
//                     Paid
//                   </button>
//                 )}

//                 {/* Pay Online */}
//                 {!item.cancelled && !item.payment && !item.isCompleted && (
//                   <button
//                     disabled={payingAppointment === item._id}
//                     onClick={() => appointmentRazorpay(item._id)}
//                     className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50"
//                   >
//                     {payingAppointment === item._id
//                       ? "Processing..."
//                       : "Pay Online"}
//                   </button>
//                 )}

//                 {/* Cancel */}
//                 {!item.cancelled && !item.isCompleted && (
//                   <button
//                     onClick={() => cancelAppointment(item._id)}
//                     className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border mt-2 hover:bg-red-600 hover:text-white transition-all duration-300"
//                   >
//                     Cancel appointment
//                   </button>
//                 )}

//                 {/* Cancelled */}
//                 {item.cancelled && !item.isCompleted && (
//                   <button
//                     disabled
//                     className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500"
//                   >
//                     Appointment Cancelled
//                   </button>
//                 )}

//                 {/* Completed */}
//                 {item.isCompleted && (
//                   <button
//                     disabled
//                     className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500"
//                   >
//                     Completed
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAppointments;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingAppointment, setPayingAppointment] = useState(null);
  const [cancellingAppointment, setCancellingAppointment] = useState(null);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "Date unavailable";

    const dateArray = slotDate.split("_");

    if (dateArray.length !== 3) {
      return slotDate;
    }

    const day = dateArray[0];
    const month = months[Number(dateArray[1])] || "";
    const year = dateArray[2];

    return `${day} ${month} ${year}`;
  };

  // --------------------------------------------------
  // Get appointments
  // --------------------------------------------------

  const getUserAppointments = async () => {
    if (!token) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          token,
        },
      });

      if (data.success) {
        // Never mutate API response with reverse()
        const sortedAppointments = [...(data.appointments || [])].reverse();

        setAppointments(sortedAppointments);
      } else {
        toast.error(data.message || "Failed to load appointments");
      }
    } catch (error) {
      console.error("Get appointments error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load appointments",
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Cancel appointment
  // --------------------------------------------------

  const cancelAppointment = async (appointmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmed) return;

    try {
      setCancellingAppointment(appointmentId);

      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        toast.success(data.message || "Appointment cancelled successfully");

        await getUserAppointments();
        await getDoctorsData();
      } else {
        toast.error(data.message || "Unable to cancel appointment");
      }
    } catch (error) {
      console.error("Cancel appointment error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel appointment",
      );
    } finally {
      setCancellingAppointment(null);
    }
  };

  // --------------------------------------------------
  // Razorpay
  // --------------------------------------------------

  const initPay = (order) => {
    if (!window.Razorpay) {
      toast.error(
        "Payment gateway failed to load. Please refresh and try again.",
      );
      setPayingAppointment(null);
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      toast.error("Razorpay configuration is missing.");
      setPayingAppointment(null);
      return;
    }

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: "MediSlot",
      description: "Doctor Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            {
              headers: {
                token,
              },
            },
          );

          if (data.success) {
            toast.success("Payment successful");

            await getUserAppointments();
            await getDoctorsData();
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          console.error("Payment verification error:", error);

          toast.error(
            error.response?.data?.message ||
              error.message ||
              "Payment verification failed",
          );
        } finally {
          setPayingAppointment(null);
        }
      },

      modal: {
        ondismiss: () => {
          setPayingAppointment(null);
        },
      },

      theme: {
        color: "#5F6FFF",
      },
    };

    try {
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Razorpay payment failed:", response);

        toast.error(response.error?.description || "Payment failed");

        setPayingAppointment(null);
      });

      razorpay.open();
    } catch (error) {
      console.error("Razorpay initialization error:", error);

      toast.error("Unable to open payment gateway.");

      setPayingAppointment(null);
    }
  };

  // --------------------------------------------------
  // Create Razorpay order
  // --------------------------------------------------

  const appointmentRazorpay = async (appointmentId) => {
    try {
      setPayingAppointment(appointmentId);

      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        {
          appointmentId,
        },
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message || "Unable to create payment order");

        setPayingAppointment(null);
      }
    } catch (error) {
      console.error("Create Razorpay order error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to create payment order",
      );

      setPayingAppointment(null);
    }
  };

  // --------------------------------------------------
  // Load appointments
  // --------------------------------------------------

  useEffect(() => {
    getUserAppointments();
  }, [token]);

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-xl sm:text-2xl font-medium text-gray-800">
            My Appointments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your upcoming and previous doctor appointments.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto border-2 border-gray-200 border-t-primary rounded-full animate-spin" />

              <p className="mt-4 text-sm text-gray-500">
                Loading your appointments...
              </p>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-50">
              <span className="text-2xl">📅</span>
            </div>

            <h2 className="mt-5 text-lg sm:text-xl font-medium text-gray-800">
              No appointments yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              You don't have any appointments yet. Book an appointment with a
              doctor to see it here.
            </p>
          </div>
        )}

        {/* Appointments */}
        {!loading && appointments.length > 0 && (
          <div className="mt-6 space-y-5">
            {appointments.map((item) => {
              const doctor = item.docData || {};
              const address = doctor.address || {};

              const isPaying = payingAppointment === item._id;

              const isCancelling = cancellingAppointment === item._id;

              return (
                <article
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="flex flex-col md:flex-row gap-5 p-4 sm:p-5 lg:p-6">
                    {/* Doctor Image */}
                    <div className="w-full md:w-48 lg:w-52 shrink-0">
                      <div className="bg-indigo-50 rounded-xl overflow-hidden">
                        <img
                          src={doctor.image || "/default-doctor.png"}
                          alt={doctor.name ? `Dr. ${doctor.name}` : "Doctor"}
                          className="w-full aspect-[4/3] md:aspect-square object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Doctor Information */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {doctor.name || "Doctor"}
                      </h2>

                      <p className="mt-1 text-sm text-gray-600">
                        {doctor.speciality || "Speciality not available"}
                      </p>

                      {/* Appointment Details */}
                      <div className="mt-5 space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">
                            Clinic Address
                          </p>

                          <p className="mt-1 text-gray-500">
                            {address.line1 || "Address not available"}
                          </p>

                          {address.line2 && (
                            <p className="text-gray-500">{address.line2}</p>
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-gray-700">
                            Date & Time
                          </p>

                          <p className="mt-1 text-gray-600">
                            {slotDateFormat(item.slotDate)}{" "}
                            <span className="text-gray-400">|</span>{" "}
                            {item.slotTime || "Time unavailable"}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="mt-5">
                        {item.cancelled ? (
                          <span className="inline-flex px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                            Cancelled
                          </span>
                        ) : item.isCompleted ? (
                          <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                            Completed
                          </span>
                        ) : item.payment ? (
                          <span className="inline-flex px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-medium">
                            Payment Completed
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-medium">
                            Payment Pending
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full md:w-52 shrink-0 flex flex-col justify-end gap-2">
                      {/* Paid */}
                      {!item.cancelled && item.payment && !item.isCompleted && (
                        <button
                          type="button"
                          disabled
                          className="w-full py-2.5 rounded-lg border border-indigo-200 bg-indigo-50 text-primary text-sm font-medium"
                        >
                          Payment Completed
                        </button>
                      )}

                      {/* Pay Online */}
                      {!item.cancelled &&
                        !item.payment &&
                        !item.isCompleted && (
                          <button
                            type="button"
                            disabled={isPaying}
                            onClick={() => appointmentRazorpay(item._id)}
                            className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isPaying ? "Processing..." : "Pay Online"}
                          </button>
                        )}

                      {/* Cancel */}
                      {!item.cancelled && !item.isCompleted && (
                        <button
                          type="button"
                          disabled={isCancelling}
                          onClick={() => cancelAppointment(item._id)}
                          className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isCancelling
                            ? "Cancelling..."
                            : "Cancel Appointment"}
                        </button>
                      )}

                      {/* Cancelled */}
                      {item.cancelled && !item.isCompleted && (
                        <button
                          type="button"
                          disabled
                          className="w-full py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium"
                        >
                          Appointment Cancelled
                        </button>
                      )}

                      {/* Completed */}
                      {item.isCompleted && (
                        <button
                          type="button"
                          disabled
                          className="w-full py-2.5 rounded-lg border border-green-200 bg-green-50 text-green-600 text-sm font-medium"
                        >
                          Appointment Completed
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAppointments;
