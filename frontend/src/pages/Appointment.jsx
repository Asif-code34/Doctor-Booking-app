// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import RelatedDoctors from "../components/RelatedDoctors";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Appointment = () => {
//   const { docId } = useParams();
//   const navigate = useNavigate();
//   const daysOfWeek = ["Sun", "Mon", "Tues", "wed", "Tues", "Fri", "Sat"];

//   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
//     useContext(AppContext);
//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");

//   const fetchDocInfo = async () => {
//     const info = doctors.find((doc) => doc._id === docId);
//     setDocInfo(info);
//   };
//   const getAvailableSlots = async () => {
//     setDocSlots([]);
//     //getting current date
//     let today = new Date();

//     for (let i = 0; i < 7; i++) {
//       //getting date with index
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       //setting end time of the date with index
//       let endTime = new Date();
//       endTime.setDate(today.getDate() + i);
//       endTime.setHours(21, 0, 0, 0);

//       //setting hours
//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(
//           currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
//         );
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }
//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         let day = currentDate.getDay();
//         let month = currentDate.getMonth() + 1;
//         let year = currentDate.getFullYear();

//         const slotDate = day + "_" + month + "_" + year;
//         const slotTime = formattedTime;

//         const isSlotAvailable =
//           docInfo.slots_booked[slotDate] &&
//           docInfo.slots_booked[slotDate].includes(slotTime)
//             ? false
//             : true;

//         if (isSlotAvailable) {
//           //add slots to arrayh
//           timeSlots.push({
//             dateTime: new Date(currentDate),
//             time: formattedTime,
//           });
//         }

//         //increment current time by 30 mint

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }
//       setDocSlots((prev) => [...prev, timeSlots]);
//     }
//   };

//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   useEffect(() => {
//     getAvailableSlots();
//   }, [docInfo]);

//   useEffect(() => {
//     console.log(docSlots);
//   }, [docSlots]);

//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warn("Login to book appointment");
//       return navigate("/login");
//     }
//     try {
//       const date = docSlots[slotIndex][0].dateTime;
//       let day = date.getDay();
//       let month = date.getMonth() + 1;
//       let year = date.getFullYear();

//       const slotDate = day + "_" + month + "_" + year;
//       const { data } = await axios.post(
//         backendUrl + "/api/user/book-appointment",
//         { docId, slotDate, slotTime },
//         { headers: { token } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getDoctorsData();
//         navigate("/my-appointment");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };
//   return (
//     docInfo && (
//       <div>
//         {/* Doctors-details */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <img
//               className="bg-primary w-full sm:max-w-72 rounded-lg"
//               src={docInfo.image}
//               alt=""
//             />
//           </div>
//           <div className="flex-1 border border-gray-400  rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//               {docInfo.name}{" "}
//               <img className="w-5" src={assets.verified_icon} alt="" />
//             </p>
//             <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//               <p>
//                 {docInfo.degree} - {docInfo.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded-full">
//                 {docInfo.experience}
//               </button>
//             </div>
//             <div>
//               <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//                 About <img src={assets.info_icon} />
//               </p>
//               <p className="text-sm text-gray-500 max-w-[700xpx] mt-1">
//                 {docInfo.about}
//               </p>
//             </div>
//             <p className="text-gray-500 font-medium mt-4">
//               Appointment fee :
//               <span className="text-gray-600">
//                 {currencySymbol}
//                 {docInfo.fees}
//               </span>
//             </p>
//           </div>
//         </div>
//         {/*--booking slot--*/}
//         <div className="sm: ml-72 sm:pl-4 font-medium text-gray-700">
//           <p>Booking slots</p>
//           <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//             {docSlots.length &&
//               docSlots.map((item, index) => (
//                 <div
//                   onClick={() => setSlotIndex(index)}
//                   className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                     slotIndex === index
//                       ? "bg-primary text-white"
//                       : "border border-gray-200"
//                   }`}
//                   key={index}
//                 >
//                   <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
//                   <p>{item[0] && item[0].dateTime.getDate()}</p>
//                 </div>
//               ))}
//           </div>
//           <div className="flex items-center w-full gap-3 overflow-x-scroll mt-4">
//             {docSlots.length &&
//               docSlots[slotIndex].map((item, index) => (
//                 <p
//                   onClick={() => setSlotTime(item.time)}
//                   className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
//                     ${
//                       item.time === slotTime
//                         ? "bg-primary text-white"
//                         : "text-gray-400 border border-gray-300"
//                     }`}
//                   key={index}
//                 >
//                   {item.time.toLowerCase()}
//                 </p>
//               ))}
//           </div>
//           <button
//             onClick={bookAppointment}
//             className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
//           >
//             Book an appointment
//           </button>
//         </div>
//         {/* --listing of related doctors --*/}
//         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//       </div>
//     )
//   );
// };
// export default Appointment;

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const fetchDocInfo = () => {
    if (!Array.isArray(doctors)) {
      setDocInfo(null);
      return;
    }

    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info || null);
  };

  const getAvailableSlots = () => {
    if (!docInfo) {
      setDocSlots([]);
      return;
    }

    setDocSlots([]);
    setSlotIndex(0);
    setSlotTime("");

    const today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );

        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDay();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;

        const bookedSlots = docInfo.slots_booked?.[slotDate] || [];

        const isSlotAvailable = !bookedSlots.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      navigate("/login");
      return;
    }

    if (!docSlots[slotIndex]?.length) {
      toast.warn("No available slots for this day");
      return;
    }

    if (!slotTime) {
      toast.warn("Please select an appointment time");
      return;
    }

    try {
      setBooking(true);

      const date = docSlots[slotIndex][0].dateTime;

      const day = date.getDay();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        await getDoctorsData();

        navigate("/my-appointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Book appointment error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to book appointment",
      );
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 text-sm">Loading doctor information...</p>
      </div>
    );
  }

  if (!docInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-800">
          Doctor not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The doctor you are looking for is unavailable or no longer exists.
        </p>

        <button
          type="button"
          onClick={() => navigate("/doctors")}
          className="mt-5 px-6 py-3 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Browse Doctors
        </button>
      </div>
    );
  }

  const selectedDaySlots = docSlots[slotIndex] || [];

  return (
    <section className="py-6 sm:py-8">
      {/* Doctor Details */}
      <div className="flex flex-col md:flex-row gap-5 sm:gap-6">
        {/* Doctor Image */}
        <div className="w-full md:w-auto shrink-0">
          <div className="bg-primary rounded-xl overflow-hidden">
            <img
              className="w-full max-w-full sm:max-w-sm md:w-72 lg:w-80 h-auto object-cover"
              src={docInfo.image}
              alt={`Dr. ${docInfo.name}`}
            />
          </div>
        </div>

        {/* Doctor Information */}
        <div className="flex-1 border border-gray-300 rounded-xl p-5 sm:p-7 md:p-8 bg-white">
          {/* Name */}
          <div className="flex items-start gap-2">
            <h1 className="text-xl sm:text-2xl font-medium text-gray-900 leading-tight">
              {docInfo.name}
            </h1>

            <img
              className="w-5 h-5 mt-1 shrink-0"
              src={assets.verified_icon}
              alt="Verified doctor"
            />
          </div>

          {/* Degree / Speciality / Experience */}
          <div className="flex flex-wrap items-center gap-2 text-sm mt-2 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <span className="py-1 px-2 border border-gray-300 text-xs rounded-full whitespace-nowrap">
              {docInfo.experience}
            </span>
          </div>

          {/* About */}
          <div className="mt-5">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-gray-900">About</p>

              <img
                className="w-4 h-4"
                src={assets.info_icon}
                alt=""
                aria-hidden="true"
              />
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mt-2 max-w-3xl">
              {docInfo.about}
            </p>
          </div>

          {/* Fee */}
          <p className="text-gray-500 font-medium mt-5 text-sm sm:text-base">
            Appointment fee:{" "}
            <span className="text-gray-700">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="mt-8 md:ml-0 lg:ml-[calc(18rem+1.5rem)]">
        <div className="font-medium text-gray-700">
          <h2 className="text-lg sm:text-xl text-gray-900">Booking Slots</h2>

          {/* Days */}
          <div className="w-full overflow-x-auto mt-4 pb-2">
            <div className="flex gap-3 min-w-max">
              {docSlots.map((item, index) => {
                const firstSlot = item[0];

                if (!firstSlot) {
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled
                      className="flex flex-col items-center justify-center min-w-[64px] h-20 px-3 rounded-full border border-gray-200 text-gray-300 cursor-not-allowed"
                    >
                      <span className="text-xs">
                        {
                          daysOfWeek[
                            new Date(Date.now() + index * 86400000).getDay()
                          ]
                        }
                      </span>

                      <span className="text-base mt-1">—</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSlotIndex(index);
                      setSlotTime("");
                    }}
                    className={`flex flex-col items-center justify-center min-w-[64px] h-20 px-3 rounded-full transition-colors ${
                      slotIndex === index
                        ? "bg-primary text-white"
                        : "border border-gray-200 text-gray-700 hover:border-primary"
                    }`}
                  >
                    <span className="text-xs">
                      {daysOfWeek[firstSlot.dateTime.getDay()]}
                    </span>

                    <span className="text-base mt-1">
                      {firstSlot.dateTime.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="w-full overflow-x-auto mt-4 pb-2">
            <div className="flex gap-3 min-w-max">
              {selectedDaySlots.length > 0 ? (
                selectedDaySlots.map((item) => (
                  <button
                    key={item.time}
                    type="button"
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2.5 rounded-full transition-colors ${
                      item.time === slotTime
                        ? "bg-primary text-white"
                        : "text-gray-600 border border-gray-300 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No available slots for this day.
                </p>
              )}
            </div>
          </div>

          {/* Book Button */}
          <button
            type="button"
            onClick={bookAppointment}
            disabled={booking || !slotTime}
            className={`w-full sm:w-auto min-w-[220px] text-white text-sm font-medium px-8 sm:px-10 py-3 rounded-full mt-6 transition-all ${
              booking || !slotTime
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary hover:opacity-90"
            }`}
          >
            {booking ? "Booking..." : "Book an Appointment"}
          </button>
        </div>
      </div>

      {/* Related Doctors */}
      <div className="mt-12 sm:mt-16">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </section>
  );
};

export default Appointment;
