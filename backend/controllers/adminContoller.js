import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';
//api for adding Doctor

 export const addDoctor =async(req,res)=>{

try {
   const {name,email,password,speciality,degree,experience,about,fees,address} =req.body;
   const imageFile =req.file
   if(!name ||!email||!password ||!speciality || !degree ||!experience || !about || !fees || !address){
    return res.json({
        success:false,
        message:"Missing Details"
    })
   }
   //validating email format
   if(!validator.isEmail(email)){
    return res.json({
        success:false,
        message:"Please enter a valid email"
    })
   }
   //validating strong password
   if(password.length < 8){
    return res.json({
        success:false,
        message:"please enter strong password"
    })
   }
   //hashing pssword
   const salt = await bcrypt.genSalt(10)
   const hashedpassword = await bcrypt.hash(password,salt)

   //upload image to cloudinary
   const imageupload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
   const imageUrl =imageupload.secure_url

   const doctorData ={
    name,
    email,
    image:imageUrl,
    password:hashedpassword,
    speciality,
    degree,
    experience,
    about,
    fees,
    address:JSON.parse(address),//beacuse we are getting obj but in formdata we want string
    date:Date.now()
   }
   const newDoctor = new doctorModel(doctorData)
  await newDoctor.save()
  res.json({
    success:true,
    message:"Doctor added"

  })
} catch (error) {
    console.log(error)
    res.json({
        success:false,
        message:error.message
    })
}
}
//Api for admin login
 export const loginAdmin = async(req,res)=>{
    try {
        const{email,password} =req.body
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
  const token =  jwt.sign(email+password,process.env.JWT_SECRET)
  res.json({
    success:true,
    token
  })
        }else{
            res.json({
                success:false,
                message:"Invalid Credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}
export const allDoctors =async(req,res)=>{
   try {
    const doctors =await doctorModel.find({}).select('-password')
    res.json({
        success:true,
        doctors
    })
   } catch (error) {
    console.log(error)
    res.json({
        success:false,
        message:error.message
    })
   }
}
//Api to get all appointment list
export const appointmentsAdmin =async(req,res)=>{
try {
    const appointments =await appointmentModel.find({})
    res.json({
        success:true,
        appointments
    })
} catch (error) {
    console.log(error)
    res.json({
        success:false,
        message:error.message
    })
}
}
//Api for appointment cancellation
export const appointmentCancel =async(req,res)=>{
try {
    const {appointmentId} = req.body
const appointmentData = await appointmentModel.findById(appointmentId)


await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

//release doctor slot
const {docId,slotDate,slotTime}= appointmentData
const doctorData =await doctorModel.findById(docId)
let slots_booked = doctorData.slots_booked
slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e !== slotTime)

await doctorModel.findByIdAndUpdate(docId,{slots_booked})
res.json({
    success:true,
    message:"Appointment Cancelled"
})
} catch (error) {
    console.log(error)
    res.json({
        success:false,
        message:error.message
    })
}
}
 export const adminDashboard =async(req,res)=>{
try {
    const doctors= await doctorModel.find({})
    const users = await userModel.find({})
    const appointments=await appointmentModel.find({})
    const dashData={
        doctors : doctors.length,
        appointments:appointments.length,
       patients :users.length,
        latestAppointment :appointments.reverse().slice(0,5)
    }
    res.json({
        success:true,dashData
    })
} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}
}