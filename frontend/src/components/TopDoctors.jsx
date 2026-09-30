// import React, { useContext } from "react";
// //import { doctors } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const TopDoctors = () => {
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);
//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
//       <h1 className="text-3xl font-medium">Top Doctors to Book </h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Simply browse through our extensive list of trusted Doctors
//       </p>
//       <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
//         {doctors.slice(0, 10).map((item, index) => (
//           <div
//             onClick={() => {
//               navigate(`/appointment/${item._id}`);
//               scrollTo(0, 0);
//             }}
//             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
//             key={index}
//           >
//             <img className="bg-blue-50" src={item.image} />
//             <div className="p-4">
//               <div
//                 className={`flex items-center gap-2 text-sm ${
//                   item.available ? "text-green-500" : "text-gray-500"
//                 } `}
//               >
//                 <p
//                   className={`w-2 h-2 ${
//                     item.available ? "bg-green-500" : "bg-gray-500"
//                   } rounded-full`}
//                 ></p>
//                 <p> {item.available ? "Available" : "Not Available"}</p>
//               </div>
//               <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//               <p className="text-gray-600 text-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button
//         className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
//         onClick={() => {
//           navigate("/doctors");
//           scrollTo(0, 0);
//         }}
//       >
//         More
//       </button>
//     </div>
//   );
// };

// export default TopDoctors;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const handleDoctorClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleViewAll = () => {
    navigate("/doctors");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const displayedDoctors = Array.isArray(doctors) ? doctors.slice(0, 10) : [];

  return (
    <section className="flex flex-col items-center gap-4 my-12 sm:my-16 px-4 sm:px-6 lg:px-10 text-gray-900">
      {/* Heading */}
      <div className="text-center max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-medium">
          Top Doctors to Book
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
          Simply browse through our extensive list of trusted doctors and book
          your appointment.
        </p>
      </div>

      {/* Doctors Grid */}
      {displayedDoctors.length > 0 ? (
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 pt-5">
          {displayedDoctors.map((item) => (
            <article
              key={item._id}
              onClick={() => handleDoctorClick(item._id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleDoctorClick(item._id);
                }
              }}
              role="button"
              tabIndex={0}
              className="group border border-blue-200 rounded-xl overflow-hidden cursor-pointer bg-white hover:-translate-y-2 hover:shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {/* Doctor Image */}
              <div className="bg-blue-50 aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={`Dr. ${item.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Doctor Information */}
              <div className="p-3 sm:p-4">
                <div
                  className={`flex items-center gap-2 text-xs sm:text-sm ${
                    item.available ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.available ? "bg-green-500" : "bg-gray-400"
                    }`}
                    aria-hidden="true"
                  />

                  <span>{item.available ? "Available" : "Not Available"}</span>
                </div>

                <h3 className="mt-2 text-base sm:text-lg text-gray-900 font-medium truncate">
                  {item.name}
                </h3>

                <p className="text-gray-600 text-sm mt-0.5 truncate">
                  {item.speciality}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="w-full py-12 text-center text-gray-500">
          <p>No doctors available at the moment.</p>
        </div>
      )}

      {/* View All Button */}
      <button
        type="button"
        onClick={handleViewAll}
        className="bg-blue-50 text-gray-700 px-10 sm:px-12 py-3 rounded-full mt-6 sm:mt-8 font-medium hover:bg-primary hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        View All Doctors
      </button>
    </section>
  );
};

export default TopDoctors;
