// import React, { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { AdminContext } from "../../context/AdminContext";

// const DoctorProfile = () => {
//   const { getProfileData, profileData, dToken, setProfileData } =
//     useContext(DoctorContext);
//   const { currency } = useContext(AppContext);
//   const { backendUrl } = useContext(AdminContext);
//   const [isEdit, setIsEdit] = useState(false);
//   useEffect(() => {
//     if (dToken) {
//       getProfileData();
//     }
//   }, [dToken]);

//   const updateProfile = async () => {
//     try {
//       const updatedData = {
//         address: profileData.address,
//         fees: profileData.fees,
//         available: profileData.available,
//       };
//       const { data } = await axios.post(
//         backendUrl + "/api/doctor/update-profile",
//         updatedData,
//         { headers: { dToken } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         setIsEdit(false);
//         getProfileData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };
//   return (
//     profileData && (
//       <div>
//         <div className="flex flex-col gap-4 m-5">
//           <div>
//             <img
//               className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
//               src={profileData.image}
//               alt=""
//             />
//           </div>
//           <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
//             {/* doc info- name,degree,experience */}
//             <p className="flex item-center gap-2 text-3xl text-gray-700">
//               {profileData.name}
//             </p>
//             <div className="flex items-center text-gray-600 gap-2 mt-1">
//               <p>
//                 {profileData.degree}-{profileData.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded-full">
//                 {profileData.experience}
//               </button>
//             </div>
//             {/* doctor about */}
//             <div>
//               <p className="flex item-center gap-1 text-sm font-medium text-neutral-800 mt-3">
//                 About:
//               </p>
//               <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//                 {profileData.about}
//               </p>
//             </div>
//             <p className="text-gray-600 font-medium mt-4">
//               Appointment fee:
//               <span className="text-gray-800">
//                 {currency}
//                 {isEdit ? (
//                   <input
//                     type="number"
//                     value={profileData.fees}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         fees: e.target.value,
//                       }))
//                     }
//                   />
//                 ) : (
//                   profileData.fees
//                 )}
//               </span>
//             </p>
//             <div className="flex gap-2 py-2">
//               <p>Address :</p>
//               <p className="text-sm">
//                 {isEdit ? (
//                   <input
//                     type="text"
//                     value={profileData.address.line1}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         address: { ...prev.address, line1: e.target.value },
//                       }))
//                     }
//                   />
//                 ) : (
//                   profileData.address.line1
//                 )}
//                 <br />
//                 {isEdit ? (
//                   <input
//                     className="border"
//                     type="text"
//                     value={profileData.address.line2}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         address: { ...prev.address, line2: e.target.value },
//                       }))
//                     }
//                   />
//                 ) : (
//                   profileData.address.line2
//                 )}
//               </p>
//             </div>
//             <div className="flex gap-1 pt-2">
//               <input
//                 onChange={() =>
//                   isEdit &&
//                   setProfileData((prev) => ({
//                     ...prev,
//                     available: !prev.available,
//                   }))
//                 }
//                 type="checkbox"
//                 checked={profileData.available}
//                 name=""
//                 id=""
//               />
//               <label htmlFor="">Available</label>
//             </div>
//             {isEdit ? (
//               <button
//                 onClick={updateProfile}
//                 className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//               >
//                 Save
//               </button>
//             ) : (
//               <button
//                 onClick={() => setIsEdit(true)}
//                 className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default DoctorProfile;

import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";

const DoctorProfile = () => {
  const { getProfileData, profileData, dToken, setProfileData } =
    useContext(DoctorContext);

  const { currency } = useContext(AppContext);
  const { backendUrl } = useContext(AdminContext);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updatedData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updatedData,
        { headers: { dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    profileData && (
      <main className="min-w-0 flex-1 w-full overflow-x-hidden">
        <div
          className="
            w-full
            min-w-0
            px-3
            py-4
            sm:px-5 sm:py-5
            md:px-6 md:py-6
            lg:px-7
          "
        >
          {/* Profile Container */}
          <div
            className="
              flex
              w-full
              min-w-0
              flex-col
              gap-5
              lg:flex-row
              lg:items-start
              lg:gap-6
            "
          >
            {/* ================= PROFILE IMAGE ================= */}
            <div className="w-full shrink-0 lg:w-64">
              <div className="overflow-hidden rounded-xl bg-primary/10">
                <img
                  className="
                    aspect-square
                    w-full
                    object-cover
                    sm:max-w-72
                    lg:max-w-none
                  "
                  src={profileData.image}
                  alt={profileData.name}
                />
              </div>
            </div>

            {/* ================= PROFILE DETAILS ================= */}
            <div
              className="
                min-w-0
                w-full
                flex-1
                rounded-xl
                border
                border-gray-100
                bg-white
                p-4
                sm:p-6
                md:p-7
                lg:p-8
              "
            >
              {/* Doctor Name */}
              <h1
                className="
                  break-words
                  text-2xl
                  font-semibold
                  leading-tight
                  text-gray-800
                  sm:text-3xl
                "
              >
                {profileData.name}
              </h1>

              {/* Degree / Speciality / Experience */}
              <div
                className="
                  mt-2
                  flex
                  min-w-0
                  flex-wrap
                  items-center
                  gap-2
                  text-sm
                  text-gray-600
                "
              >
                <p className="break-words">
                  {profileData.degree} - {profileData.speciality}
                </p>

                <span
                  className="
                    shrink-0
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-50
                    px-2.5
                    py-1
                    text-xs
                    text-gray-600
                  "
                >
                  {profileData.experience}
                </span>
              </div>

              {/* ================= ABOUT ================= */}
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-800">About</p>

                <p
                  className="
                    mt-1
                    max-w-3xl
                    break-words
                    text-sm
                    leading-6
                    text-gray-600
                  "
                >
                  {profileData.about}
                </p>
              </div>

              {/* ================= APPOINTMENT FEE ================= */}
              <div className="mt-5">
                <p className="text-sm font-medium text-gray-600">
                  Appointment fee
                </p>

                {isEdit ? (
                  <div className="mt-2 flex w-full max-w-xs items-center">
                    <span className="rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
                      {currency}
                    </span>

                    <input
                      type="number"
                      value={profileData.fees}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      className="
                        min-w-0
                        flex-1
                        rounded-r-lg
                        border
                        border-gray-200
                        px-3
                        py-2
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </div>
                ) : (
                  <p className="mt-1 text-base font-semibold text-gray-800">
                    {currency}
                    {profileData.fees}
                  </p>
                )}
              </div>

              {/* ================= ADDRESS ================= */}
              <div className="mt-5">
                <p className="text-sm font-medium text-gray-600">Address</p>

                {isEdit ? (
                  <div className="mt-2 flex w-full max-w-2xl flex-col gap-2">
                    <input
                      type="text"
                      value={profileData.address.line1}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value,
                          },
                        }))
                      }
                      placeholder="Address line 1"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-gray-200
                        px-3
                        py-2.5
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />

                    <input
                      type="text"
                      value={profileData.address.line2}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value,
                          },
                        }))
                      }
                      placeholder="Address line 2"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-gray-200
                        px-3
                        py-2.5
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </div>
                ) : (
                  <p
                    className="
                      mt-1
                      max-w-2xl
                      break-words
                      text-sm
                      leading-6
                      text-gray-600
                    "
                  >
                    {profileData.address.line1}
                    <br />
                    {profileData.address.line2}
                  </p>
                )}
              </div>

              {/* ================= AVAILABILITY ================= */}
              <div className="mt-5">
                <label
                  htmlFor="doctor-availability"
                  className="
                    inline-flex
                    cursor-pointer
                    items-center
                    gap-2
                    text-sm
                    text-gray-600
                  "
                >
                  <input
                    id="doctor-availability"
                    type="checkbox"
                    checked={profileData.available}
                    onChange={() =>
                      isEdit &&
                      setProfileData((prev) => ({
                        ...prev,
                        available: !prev.available,
                      }))
                    }
                    className="
                      h-4
                      w-4
                      cursor-pointer
                      accent-primary
                    "
                  />

                  <span>Available</span>
                </label>
              </div>

              {/* ================= ACTION BUTTON ================= */}
              <div className="mt-6">
                {isEdit ? (
                  <button
                    type="button"
                    onClick={updateProfile}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-primary
                      bg-primary
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      text-white
                      transition-all
                      hover:opacity-90
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary/30
                      sm:w-auto
                    "
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEdit(true)}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-primary
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      text-primary
                      transition-all
                      hover:bg-primary
                      hover:text-white
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary/30
                      sm:w-auto
                    "
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default DoctorProfile;
