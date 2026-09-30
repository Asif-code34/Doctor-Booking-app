// import React from "react";
// import { specialityData } from "../assets/assets";
// import { Link } from "react-router-dom";

// const SpecialityMenu = () => {
//   return (
//     <div
//       className="flex flex-col items-center gap-4 py-16 text-gray-800"
//       id="speciality"
//     >
//       <h1 className="text-3xl font-medium">Find by Speciality</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Simply browse through our extensive list of trusted doctors,schedule
//         uour appointment
//       </p>
//       <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
//         {specialityData.map((item, index) => (
//           <Link
//             onClick={() => scrollTo(0, 0)}
//             className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
//             key={index}
//             to={`/doctors/${item.speciality}`}
//           >
//             <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
//             <p>{item.speciality}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpecialityMenu;

import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  const handleSpecialityClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-4 py-12 sm:py-16 px-4 text-gray-800"
    >
      {/* Section Heading */}
      <div className="text-center max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-medium">Find by Speciality</h2>

        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
          Simply browse through our extensive list of trusted doctors and
          schedule your appointment easily.
        </p>
      </div>

      {/* Specialities */}
      <div className="w-full mt-4 overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="flex sm:justify-center gap-5 sm:gap-7 min-w-max px-2 pb-3">
          {specialityData.map((item) => (
            <Link
              key={item.speciality}
              to={`/doctors/${item.speciality}`}
              onClick={handleSpecialityClick}
              className="group flex flex-col items-center justify-center min-w-[72px] sm:min-w-[96px] text-xs sm:text-sm text-gray-700 transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
                <img
                  className="w-full h-full object-contain"
                  src={item.image}
                  alt={`${item.speciality} speciality`}
                  loading="lazy"
                />
              </div>

              <p className="mt-2 text-center whitespace-nowrap group-hover:text-primary transition-colors">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
