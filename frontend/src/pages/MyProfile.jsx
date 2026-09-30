// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyProfile = () => {
//   const { userData, setUserData, backendUrl, token, loadUserProfileData } =
//     useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);

//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", userData.name);
//       formData.append("phone", userData.phone);
//       formData.append("address", JSON.stringify(userData.address));
//       formData.append("gender", userData.gender);
//       formData.append("dob", userData.dob);
//       image && formData.append("image", image);

//       const { data } = await axios.post(
//         backendUrl + "/api/user/update-profile",
//         formData,
//         { headers: { token } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         await loadUserProfileData();
//         setIsEdit(false);
//         setImage(false);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     userData && (
//       <div className="max-w-lg flex flex-col gap-2 text-sm">
//         {isEdit ? (
//           <label htmlFor="image">
//             <div className="inline-block relative cursor-pointer">
//               <img
//                 className="w-36 rounded opacity-75"
//                 src={image ? URL.createObjectURL(image) : userData.image}
//                 alt=""
//               />
//               <img
//                 className="w-10 absolute bottom-12 right-12"
//                 src={image ? "" : assets.upload_icon}
//                 alt=""
//               />
//             </div>
//             <input
//               type="file"
//               hidden
//               id="image"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </label>
//         ) : (
//           <img className="w-36 rounded" src={userData.image} alt="" />
//         )}

//         {isEdit ? (
//           <input
//             className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
//             type="text"
//             value={userData.name}
//             onChange={(e) =>
//               setUserData((prev) => ({ ...prev, name: e.target.value }))
//             }
//           />
//         ) : (
//           <p className="font-medium text-3xl text-neutral-800 mt-4">
//             {userData.name}
//           </p>
//         )}
//         <hr className="bg-zinc-400 h-[1px] border-none" />
//         <div>
//           <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
//           <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//             <p className="font-medium">Email Id</p>
//             <p className="text-blue-500">{userData.email}</p>
//             <p className="font-medium">Phone:</p>
//             {isEdit ? (
//               <input
//                 className="bg-gray-100 max-w-52"
//                 type="text"
//                 value={userData.phone}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, phone: e.target.value }))
//                 }
//               />
//             ) : (
//               <p className="text-blue-400">{userData.phone}</p>
//             )}
//             <p className="font-medium">Address:</p>
//             {isEdit ? (
//               <p>
//                 <input
//                   className="bg-gray-50"
//                   type="text"
//                   value={userData.address.line1}
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line1: e.target.value },
//                     }))
//                   }
//                 />
//                 <br />
//                 <input
//                   className="bg-gray-50"
//                   type="text"
//                   value={userData.address.line2}
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line2: e.target.value },
//                     }))
//                   }
//                 />
//               </p>
//             ) : (
//               <p className="text-gray-500">
//                 {userData.address.line1}
//                 <br />
//                 {userData.address.line2}
//               </p>
//             )}
//           </div>
//         </div>
//         <div>
//           <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
//           <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//             <p className="font-medium">Gender:</p>
//             {isEdit ? (
//               <select
//                 className="max-w-20 bg-gray-100"
//                 value={userData.gender}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, gender: e.target.value }))
//                 }
//               >
//                 <option value="Male">Male</option>
//                 <option value="femAle">Female</option>
//               </select>
//             ) : (
//               <p className="text-gray-400">{userData.gender}</p>
//             )}
//             <p className="font-medium ">Birthday:</p>
//             {isEdit ? (
//               <input
//                 className="max-w-28 bg-gray-100"
//                 type="date"
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, dob: e.target.value }))
//                 }
//                 value={userData.dob}
//               />
//             ) : (
//               <p className="text-gray-400">{userData.dob}</p>
//             )}
//           </div>
//         </div>
//         <div className="mt-10">
//           {isEdit ? (
//             <button
//               className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
//               onClick={updateUserProfileData}
//             >
//               Save information
//             </button>
//           ) : (
//             <button
//               className="border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all"
//               onClick={() => setIsEdit(true)}
//             >
//               Edit
//             </button>
//           )}
//         </div>
//       </div>
//     )
//   );
// };

// export default MyProfile;

import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);

  // Create and clean up image preview URL
  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [image]);

  if (!userData) {
    return (
      <section className="min-h-[50vh] flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </section>
    );
  }

  const address = userData.address || {
    line1: "",
    line2: "",
  };

  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      address: {
        ...(prev.address || {}),
        [field]: value,
      },
    }));
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    // Basic client-side validation
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    setImage(selectedFile);
  };

  const handleEdit = () => {
    setImage(null);
    setIsEdit(true);
  };

  const handleCancel = async () => {
    // Reload original server data so unsaved edits are discarded
    try {
      await loadUserProfileData();
    } catch (error) {
      console.error("Failed to restore profile:", error);
    }

    setImage(null);
    setIsEdit(false);
  };

  const updateUserProfileData = async () => {
    if (!userData.name?.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!userData.phone?.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", userData.name.trim());
      formData.append("phone", userData.phone.trim());
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        toast.success(data.message || "Profile updated successfully.");

        await loadUserProfileData();

        setImage(null);
        setIsEdit(false);
      } else {
        toast.error(data.message || "Unable to update profile.");
      }
    } catch (error) {
      console.error("Update profile error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to update profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="w-full max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Manage your personal information and contact details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="p-5 sm:p-7 lg:p-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Profile Image */}
              <div className="shrink-0">
                {isEdit ? (
                  <label
                    htmlFor="profile-image"
                    className="group relative block w-28 h-28 sm:w-32 sm:h-32 cursor-pointer"
                  >
                    <img
                      src={imagePreview || userData.image || assets.profile_pic}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-xl border border-gray-200"
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <img
                        src={assets.upload_icon}
                        alt=""
                        aria-hidden="true"
                        className="w-8 h-8"
                      />

                      <span className="text-white text-xs mt-1">
                        Change photo
                      </span>
                    </div>

                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </label>
                ) : (
                  <img
                    src={userData.image || assets.profile_pic}
                    alt={`${userData.name || "User"} profile`}
                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl border border-gray-200"
                  />
                )}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                {isEdit ? (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={userData.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg text-lg font-medium text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your name"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 break-words">
                      {userData.name || "User"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 break-all">
                      {userData.email}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-5 sm:p-7 lg:p-8 border-b border-gray-100">
            <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Contact Information
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-6 gap-y-5 text-sm">
              {/* Email */}
              <p className="font-medium text-gray-700">Email</p>

              <p className="text-primary break-all">
                {userData.email || "Not provided"}
              </p>

              {/* Phone */}
              <label htmlFor="phone" className="font-medium text-gray-700">
                Phone
              </label>

              {isEdit ? (
                <input
                  id="phone"
                  type="tel"
                  value={userData.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full max-w-md px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="text-gray-600 break-words">
                  {userData.phone || "Not provided"}
                </p>
              )}

              {/* Address */}
              <p className="font-medium text-gray-700">Address</p>

              {isEdit ? (
                <div className="space-y-3 w-full max-w-md">
                  <input
                    type="text"
                    value={address.line1 || ""}
                    onChange={(e) =>
                      handleAddressChange("line1", e.target.value)
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Address line 1"
                  />

                  <input
                    type="text"
                    value={address.line2 || ""}
                    onChange={(e) =>
                      handleAddressChange("line2", e.target.value)
                    }
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Address line 2"
                  />
                </div>
              ) : (
                <div className="text-gray-600 break-words">
                  <p>{address.line1 || "Not provided"}</p>

                  {address.line2 && <p className="mt-1">{address.line2}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="p-5 sm:p-7 lg:p-8">
            <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Basic Information
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-6 gap-y-5 text-sm">
              {/* Gender */}
              <label htmlFor="gender" className="font-medium text-gray-700">
                Gender
              </label>

              {isEdit ? (
                <select
                  id="gender"
                  value={userData.gender || ""}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full sm:w-48 px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-600">
                  {userData.gender || "Not provided"}
                </p>
              )}

              {/* Date of Birth */}
              <label htmlFor="dob" className="font-medium text-gray-700">
                Date of Birth
              </label>

              {isEdit ? (
                <input
                  id="dob"
                  type="date"
                  value={userData.dob || ""}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="w-full sm:w-48 px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              ) : (
                <p className="text-gray-600">
                  {userData.dob || "Not provided"}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 sm:px-7 lg:px-8 py-5 bg-gray-50 border-t border-gray-100">
            {isEdit ? (
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="w-full sm:w-auto px-7 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={updateUserProfileData}
                  disabled={saving}
                  className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-primary text-white font-medium hover:opacity-90 transition-opacity disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="w-full sm:w-auto px-8 py-2.5 rounded-full border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
