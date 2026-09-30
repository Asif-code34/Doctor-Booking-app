// import jwt from 'jsonwebtoken'
// //admin authentication middlware
//  export const authAdmin =async(req,res,next)=>{
//   try {
//     const {atoken} =req.headers
//     if(!atoken){
//       return  res.json({
//             success:false,
//             message:"not Authorized Login Again"
//         }) 
//     }
//     const token_decode =jwt.verify(atoken,process.env.JWT_SECRET)
//     if(token_decode !==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
//       return  res.json({
//             success:false,
//             message:"not Authorized Login Again"
//         }) 
//     }
//     next()
//   } catch (error) {
//     console.log(error)
//     res.json({
//         success:false,
//         message:error.message
//     })
//   }
// }

import jwt from "jsonwebtoken";

// Admin authentication middleware
export const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again"
      });
    }

    const token_decode = jwt.verify(
      atoken,
      process.env.JWT_SECRET
    );

    // Keep compatibility with your existing JWT
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again"
      });
    }

    next();

  } catch (error) {
    console.log("Admin authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Authentication failed. Please login again"
    });
  }
};
