// import validator from 'validator';
// import bcrypt from 'bcrypt';
// import {v2 as cloudinary} from 'cloudinary';
// import doctorModel from '../models/doctorModel.js';
// import jwt from 'jsonwebtoken'
// import appointmentModel from '../models/appointmentModel.js';
// import userModel from '../models/userModel.js';
// //api for adding Doctor

//  export const addDoctor =async(req,res)=>{

// try {
//    const {name,email,password,speciality,degree,experience,about,fees,address} =req.body;
//    const imageFile =req.file
//    if(!name ||!email||!password ||!speciality || !degree ||!experience || !about || !fees || !address){
//     return res.json({
//         success:false,
//         message:"Missing Details"
//     })
//    }
//    //validating email format
//    if(!validator.isEmail(email)){
//     return res.json({
//         success:false,
//         message:"Please enter a valid email"
//     })
//    }
//    //validating strong password
//    if(password.length < 8){
//     return res.json({
//         success:false,
//         message:"please enter strong password"
//     })
//    }
//    //hashing pssword
//    const salt = await bcrypt.genSalt(10)
//    const hashedpassword = await bcrypt.hash(password,salt)

//    //upload image to cloudinary
//    const imageupload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
//    const imageUrl =imageupload.secure_url

//    const doctorData ={
//     name,
//     email,
//     image:imageUrl,
//     password:hashedpassword,
//     speciality,
//     degree,
//     experience,
//     about,
//     fees,
//     address:JSON.parse(address),//beacuse we are getting obj but in formdata we want string
//     date:Date.now()
//    }
//    const newDoctor = new doctorModel(doctorData)
//   await newDoctor.save()
//   res.json({
//     success:true,
//     message:"Doctor added"

//   })
// } catch (error) {
//     console.log(error)
//     res.json({
//         success:false,
//         message:error.message
//     })
// }
// }
// //Api for admin login
//  export const loginAdmin = async(req,res)=>{
//     try {
//         const{email,password} =req.body
//         if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
//   const token =  jwt.sign(email+password,process.env.JWT_SECRET)
//   res.json({
//     success:true,
//     token
//   })
//         }else{
//             res.json({
//                 success:false,
//                 message:"Invalid Credentials"
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }
// export const allDoctors =async(req,res)=>{
//    try {
//     const doctors =await doctorModel.find({}).select('-password')
//     res.json({
//         success:true,
//         doctors
//     })
//    } catch (error) {
//     console.log(error)
//     res.json({
//         success:false,
//         message:error.message
//     })
//    }
// }
// //Api to get all appointment list
// export const appointmentsAdmin =async(req,res)=>{
// try {
//     const appointments =await appointmentModel.find({})
//     res.json({
//         success:true,
//         appointments
//     })
// } catch (error) {
//     console.log(error)
//     res.json({
//         success:false,
//         message:error.message
//     })
// }
// }
// //Api for appointment cancellation
// export const appointmentCancel =async(req,res)=>{
// try {
//     const {appointmentId} = req.body
// const appointmentData = await appointmentModel.findById(appointmentId)

// await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

// //release doctor slot
// const {docId,slotDate,slotTime}= appointmentData
// const doctorData =await doctorModel.findById(docId)
// let slots_booked = doctorData.slots_booked
// slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e !== slotTime)

// await doctorModel.findByIdAndUpdate(docId,{slots_booked})
// res.json({
//     success:true,
//     message:"Appointment Cancelled"
// })
// } catch (error) {
//     console.log(error)
//     res.json({
//         success:false,
//         message:error.message
//     })
// }
// }
//  export const adminDashboard =async(req,res)=>{
// try {
//     const doctors= await doctorModel.find({})
//     const users = await userModel.find({})
//     const appointments=await appointmentModel.find({})
//     const dashData={
//         doctors : doctors.length,
//         appointments:appointments.length,
//        patients :users.length,
//         latestAppointment :appointments.reverse().slice(0,5)
//     }
//     res.json({
//         success:true,dashData
//     })
// } catch (error) {
//     console.log(error)
//     res.json({success:false,message:error.message})
// }
// }

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API for adding doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      fees === undefined ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }

    // Image is required for doctor creation
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Doctor image is required",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Validate fees
    const numericFees = Number(fees);

    if (!Number.isFinite(numericFees) || numericFees < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid consultation fees",
      });
    }

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({
      email: normalizedEmail,
    });

    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }

    // Parse address safely
    let parsedAddress;

    try {
      parsedAddress =
        typeof address === "string" ? JSON.parse(address) : address;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid address format",
      });
    }

    if (!parsedAddress || typeof parsedAddress !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid address",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    // Create doctor
    const doctorData = {
      name: name.trim(),
      email: normalizedEmail,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: numericFees,
      address: parsedAddress,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);

    await newDoctor.save();

    return res.status(201).json({
      success: true,
      message: "Doctor added",
    });
  } catch (error) {
    console.error("Add doctor error:", error);

    // Handle MongoDB duplicate key
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// API for admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail === process.env.ADMIN_EMAIL?.trim().toLowerCase() &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Keep existing JWT format for compatibility
      const token = jwt.sign(
        normalizedEmail + password,
        process.env.JWT_SECRET,
      );

      return res.status(200).json({
        success: true,
        token,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// API to get all doctors
export const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");

    return res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("All doctors error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// API to get all appointments
export const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Admin appointments error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// API for appointment cancellation
export const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Don't cancel twice
    if (appointmentData.cancelled) {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled",
      });
    }

    // Don't cancel completed appointment
    if (appointmentData.isCompleted) {
      return res.status(400).json({
        success: false,
        message: "Completed appointment cannot be cancelled",
      });
    }

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        cancelled: true,
      },
      {
        runValidators: true,
      },
    );

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    if (doctorData) {
      const slotsBooked = doctorData.slots_booked || {};

      if (slotsBooked[slotDate] && Array.isArray(slotsBooked[slotDate])) {
        slotsBooked[slotDate] = slotsBooked[slotDate].filter(
          (time) => time !== slotTime,
        );

        // Optional cleanup of empty date
        if (slotsBooked[slotDate].length === 0) {
          delete slotsBooked[slotDate];
        }

        await doctorModel.findByIdAndUpdate(
          docId,
          {
            slots_booked: slotsBooked,
          },
          {
            runValidators: true,
          },
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    console.error("Admin cancel appointment error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// API for admin dashboard
export const adminDashboard = async (req, res) => {
  try {
    // Count documents instead of loading every document
    const [doctors, users, appointments, latestAppointments] =
      await Promise.all([
        doctorModel.countDocuments(),
        userModel.countDocuments(),
        appointmentModel.countDocuments(),
        appointmentModel.find({}).sort({ date: -1 }).limit(5),
      ]);

    const dashData = {
      doctors,
      appointments,
      patients: users,
      latestAppointment: latestAppointments,
    };

    return res.status(200).json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
