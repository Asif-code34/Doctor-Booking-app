// import doctorModel from "../models/doctorModel.js"
// import bcrypt from 'bcrypt'
// import jwt from "jsonwebtoken"
// import appointmentModel from "../models/appointmentModel.js"

// const changeAvailability =async(req,res)=>{
//     try {
//         const {docId} =req.body
//         const docData =await doctorModel.findById(docId)
//         await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
//         res.json({
//             success:true,
//            message:"Availability Changed"
//         })
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }
// const doctorList =async(req,res)=>{
//     try {
//         const doctors =await doctorModel.find({}).select(['-password','-email'])
//         res.json({
//             success:true,
//             doctors
//         })
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }
// const doctorLogin= async(req,res)=>{
//     try {
//         const {email,password}=req.body

//         const doctor = await doctorModel.findOne({email})
//         if(!doctor){
//             res.json({success:false,message:"Invalid Credentials"})
//         }
//         //match password
//         const isMatch =await bcrypt.compare(password,doctor.password)

//         if(isMatch){
//             const token =jwt.sign({id:doctor._id},process.env.JWT_SECRET)
//             res.json({
//                 success:true,
//                 token
//             })
//         }else{
//             res.json({success:false,message:"Invalid Credentials"})
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:error.message
//         })

//     }
// }
// //api for doctor appointment
// const appointmentsDoctor =async(req,res)=>{
// try {
//     const{docId}=req.body
//     const appointments= await appointmentModel.find({docId})
//     res.json({success:true,appointments})
// } catch (error) {
//     console.log(error)
//     res.json({
//         success:false,
//         message:error.message
//     })
// }
// }
// //api to mark  appointment  completed  for doctor panel
// const completeAppointment = async(req,res)=>{
//     try {
//         const {docId,appointmentId} =req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)

//         if(appointmentData && appointmentData.docId==docId){
//             await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
//             return res.json({
//                 success:true,message:"Appointment Completed"
//             })
//         }
//         else{
//             return res.json({
//                 success:false,message:"U are not authorized "
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:error.message
//     })
// } }
// //api to mark  appointment  completed  for doctor panel
// const cancelAppointment = async(req,res)=>{
//     try {
//         const {docId,appointmentId} =req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)

//         if(appointmentData && appointmentData.docId==docId){
//             await appointmentModel.findByIdAndUpdate(appointmentId,{
//                 cancelled:true})
//             return res.json({
//                 success:true,message:"Appointment Cancelled"
//             })
//         }
//         else{
//             return res.json({
//                 success:false,message:"Cancellation failed "
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:error.message
//     })
// } }

// //api to get  dashboard data for doctor panel

// const doctorDashboard =async(req,res)=>{
//     try {
//         const {docId}=req.body
//         const appointments =await appointmentModel.find({docId})
//         let earnings = 0;
//          appointments.map((item)=>{
//             if(item.
//                 isCompleted
//                 ||item.payment){
//                 earnings+=item.amount
//             }
//          }

//          )
//          let patients =[]
//          appointments.map((item)=>{
//             if(!patients.includes(item.userId)){
//                 patients.push(item.userId)
//             }
//          })
//          const dashData={
//             earnings,
//             appointments:appointments.length,
//             patients:patients.length,
//             latestAppointment:appointments.reverse().slice(0,5)
//          }
//          res.json({success:true,dashData})
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:error.message
//     })
//     }
// }
// const doctorProfile =async(req,res)=>{

//     try {
//         const {docId}=req.body
//         const profileData = await doctorModel.findById(docId).select('-password')
//         res.json({success:true,profileData})
//     } catch (error) {
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }
// const updateDoctorProfile = async(req,res)=>{
//     try {
//         const {fees,address,available,docId}=req.body
//         await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
//         res.json({success:true,message:"Profile Updated"})
//     } catch (error) {
//         res.json({
//             success:false,
//             message:error.message
//         })
//     }
// }
// export {changeAvailability,doctorList,doctorLogin,appointmentsDoctor,completeAppointment,cancelAppointment,doctorDashboard,doctorProfile,updateDoctorProfile}

import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// Change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);

    if (!docData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    return res.json({
      success: true,
      message: "Availability Changed",
    });
  } catch (error) {
    console.error("Change availability error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");

    return res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Doctor list error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Doctor login
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Keep the existing JWT structure
    // so existing frontend/authentication continues to work.
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Doctor login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get doctor's appointments
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    return res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Doctor appointments error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Complete appointment
const completeAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Make sure this appointment belongs to this doctor
    if (appointmentData.docId.toString() !== docId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    if (appointmentData.cancelled) {
      return res.status(400).json({
        success: false,
        message: "Cancelled appointment cannot be completed",
      });
    }

    if (appointmentData.isCompleted) {
      return res.status(400).json({
        success: false,
        message: "Appointment is already completed",
      });
    }

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        isCompleted: true,
      },
      {
        runValidators: true,
      },
    );

    return res.json({
      success: true,
      message: "Appointment Completed",
    });
  } catch (error) {
    console.error("Complete appointment error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Make sure this appointment belongs to this doctor
    if (appointmentData.docId.toString() !== docId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    if (appointmentData.isCompleted) {
      return res.status(400).json({
        success: false,
        message: "Completed appointment cannot be cancelled",
      });
    }

    if (appointmentData.cancelled) {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled",
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

    return res.json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    console.error("Cancel appointment error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Doctor dashboard
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    // Keep your existing earnings logic
    // to avoid changing current application behavior.
    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    // Use Set to count unique patients
    const patients = new Set();

    appointments.forEach((item) => {
      if (item.userId) {
        patients.add(item.userId.toString());
      }
    });

    // Don't mutate appointments with reverse()
    const latestAppointment = [...appointments].reverse().slice(0, 5);

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.size,
      latestAppointment,
    };

    return res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.error("Doctor dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Doctor profile
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;

    const profileData = await doctorModel.findById(docId).select("-password");

    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    console.error("Doctor profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available, docId } = req.body;

    if (
      fees === undefined ||
      address === undefined ||
      available === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Required profile data is missing",
      });
    }

    const numericFees = Number(fees);

    if (!Number.isFinite(numericFees) || numericFees < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid consultation fees",
      });
    }

    if (typeof available !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid availability value",
      });
    }

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      {
        fees: numericFees,
        address,
        available,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    console.error("Update doctor profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  changeAvailability,
  doctorList,
  doctorLogin,
  appointmentsDoctor,
  completeAppointment,
  cancelAppointment,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
