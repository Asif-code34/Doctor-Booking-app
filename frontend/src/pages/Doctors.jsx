// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Doctors = () => {
//   const { speciality } = useParams();
//   const navigate = useNavigate();
//   const [filterDoc, setFilterDoc] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const { doctors } = useContext(AppContext);

//   const applyFilter = () => {
//     if (speciality) {
//       setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
//     } else {
//       setFilterDoc(doctors);
//     }
//   };
//   useEffect(() => {
//     applyFilter();
//   }, [doctors, speciality]);
//   return (
//     <div>
//       <p className="text-gray-600">Browse thrugh the doctors specialist</p>
//       <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
//         <button
//           className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
//             showFilter ? "bg-primary text-white" : ""
//           }`}
//           onClick={() => setShowFilter((prev) => !prev)}
//         >
//           Filters
//         </button>
//         <div
//           className={`flex-col gap-4 text-sm text-gray-600 ${
//             showFilter ? "flex" : "hidden sm:flex"
//           }`}
//         >
//           <p
//             onClick={() =>
//               speciality === "General Physician"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/General Physician")
//             }
//             className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               speciality === "General-physician"
//                 ? "bg-indigo-100 text-black"
//                 : ""
//             }`}
//           >
//             General physician
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Gynecologist"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Gynecologist")
//             }
//             className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Gynecologist
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Dermatologist"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Dermatologist")
//             }
//             className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Dermatologist
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Pediatricians"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Pediatricians")
//             }
//             className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Pediatricians
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Neurologist"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Neurologist")
//             }
//             className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
//             }`}
//           >
//             Neurologist
//           </p>
//           <p
//             onClick={() =>
//               speciality === "Gastroenterologist"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Gastroenterologist")
//             }
//             className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//               speciality === "Gastroenterologist"
//                 ? "bg-indigo-100 text-black"
//                 : ""
//             }`}
//           >
//             Gastroenterologist
//           </p>
//         </div>
//         <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
//           {filterDoc.map((item, index) => (
//             <div
//               onClick={() => navigate(`/appointment/${item._id}`)}
//               className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
//               key={index}
//             >
//               <img className="bg-blue-50" src={item.image} />
//               <div className="p-4">
//                 <div
//                   className={`flex items-center gap-2 text-sm ${
//                     item.available ? "text-green-500" : "text-gray-500"
//                   } `}
//                 >
//                   <p
//                     className={`w-2 h-2 ${
//                       item.available ? "bg-green-500" : "bg-gray-500"
//                     } rounded-full`}
//                   ></p>
//                   <p> {item.available ? "Available" : "Not Available"}</p>
//                 </div>
//                 <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//                 <p className="text-gray-600 text-sm">{item.speciality}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const specialities = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (!Array.isArray(doctors)) {
      setFilterDoc([]);
      return;
    }

    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  const handleSpeciality = (selectedSpeciality) => {
    if (speciality === selectedSpeciality) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${selectedSpeciality}`);
    }

    // Close mobile filter after selecting
    setShowFilter(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-6 sm:py-8">
      {/* Page Heading */}
      <div className="mb-5 sm:mb-7">
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">
          Find Doctors
        </h1>

        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Browse through our trusted doctors and find the right specialist for
          your healthcare needs.
        </p>
      </div>

      {/* Mobile Filter Button */}
      <button
        type="button"
        onClick={() => setShowFilter((prev) => !prev)}
        className={`sm:hidden inline-flex items-center justify-center px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
          showFilter
            ? "bg-primary text-white border-primary"
            : "bg-white text-gray-700 border-gray-300"
        }`}
        aria-expanded={showFilter}
      >
        {showFilter ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 mt-4 sm:mt-5">
        {/* Filters */}
        <aside
          className={`w-full sm:w-auto shrink-0 ${
            showFilter ? "block" : "hidden sm:block"
          }`}
        >
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            {specialities.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSpeciality(item)}
                className={`w-full sm:w-[190px] text-left px-4 py-2.5 border rounded-lg transition-colors ${
                  speciality === item
                    ? "bg-indigo-100 border-indigo-200 text-gray-900 font-medium"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}

            {/* Clear Filter */}
            {speciality && (
              <button
                type="button"
                onClick={() => {
                  navigate("/doctors");
                  setShowFilter(false);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="w-full sm:w-[190px] px-4 py-2.5 rounded-lg text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>
        </aside>

        {/* Doctors Grid */}
        <div className="w-full">
          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filterDoc.map((item) => (
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
                  className="group border border-blue-200 rounded-xl overflow-hidden cursor-pointer bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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

                  {/* Doctor Details */}
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

                      <span>
                        {item.available ? "Available" : "Not Available"}
                      </span>
                    </div>

                    <h2 className="mt-2 text-base sm:text-lg font-medium text-gray-900 truncate">
                      {item.name}
                    </h2>

                    <p className="mt-0.5 text-sm text-gray-600 truncate">
                      {item.speciality}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <h2 className="text-lg sm:text-xl font-medium text-gray-800">
                No doctors found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                No doctors are currently available for this speciality.
              </p>

              {speciality && (
                <button
                  type="button"
                  onClick={() => navigate("/doctors")}
                  className="mt-5 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  View All Doctors
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
