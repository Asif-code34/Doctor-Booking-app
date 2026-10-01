// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";

// const DoctorsList = () => {
//   const { doctors, getAllDoctors, aToken, changeAvailability } =
//     useContext(AdminContext);

//   useEffect(() => {
//     if (aToken) {
//       getAllDoctors();
//     }
//   }, [aToken]);
//   return (
//     <div className="m-5 max-h-[90vh] overflow-y-scroll">
//       <h1 className="text-lg font-medium">All Doctors</h1>
//       <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
//         {doctors.map((item, index) => {
//           return (
//             <div
//               className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
//               key={index}
//             >
//               <img
//                 className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
//                 src={item.image}
//                 alt=""
//               />
//               <div className="p-4">
//                 <p className="text-neutral-800 text-lg font-medium">
//                   {item.name}
//                 </p>
//                 <p className="text-zinc-600 text-sm">{item.speciality}</p>
//                 <div className="mt-2 flex items-center gap-1 text-sm">
//                   <input
//                     onChange={() => changeAvailability(item._id)}
//                     type="checkbox"
//                     checked={item.available}
//                   />
//                   <p>Available</p>
//                 </div>
//               </div>
//               ;
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <main className="min-w-0 flex-1 w-full overflow-x-hidden">
      <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-7">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
            All Doctors
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage doctors and their availability
          </p>
        </div>

        {/* Doctors Grid */}
        {doctors?.length > 0 ? (
          <div
            className="
              grid w-full min-w-0
              grid-cols-1
              gap-4
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
            "
          >
            {doctors.map((item, index) => {
              return (
                <div
                  key={item._id || index}
                  className="
                    group min-w-0 w-full
                    overflow-hidden
                    rounded-xl
                    border border-indigo-100
                    bg-white
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >
                  {/* Doctor Image */}
                  <div className="w-full overflow-hidden bg-indigo-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        aspect-square
                        w-full
                        object-cover
                        bg-indigo-50
                        transition-all duration-500
                        group-hover:bg-primary
                        group-hover:scale-[1.02]
                      "
                    />
                  </div>

                  {/* Doctor Details */}
                  <div className="min-w-0 p-3.5 sm:p-4">
                    <p
                      className="
                        truncate
                        text-base
                        font-semibold
                        text-neutral-800
                        sm:text-lg
                      "
                      title={item.name}
                    >
                      {item.name}
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        text-xs
                        text-zinc-600
                        sm:text-sm
                      "
                      title={item.speciality}
                    >
                      {item.speciality}
                    </p>

                    {/* Availability */}
                    <label
                      className="
                        mt-3
                        flex
                        cursor-pointer
                        items-center
                        gap-2
                        text-xs
                        text-gray-600
                        sm:text-sm
                      "
                    >
                      <input
                        type="checkbox"
                        onChange={() => changeAvailability(item._id)}
                        checked={item.available}
                        className="
                          h-4
                          w-4
                          shrink-0
                          cursor-pointer
                          accent-primary
                        "
                      />

                      <span className="select-none">Available</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div
            className="
              flex
              min-h-[220px]
              w-full
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-gray-200
              bg-white
              px-4
              text-center
            "
          >
            <div>
              <p className="text-sm font-medium text-gray-600">
                No doctors found
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Add a doctor to see them listed here.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DoctorsList;
