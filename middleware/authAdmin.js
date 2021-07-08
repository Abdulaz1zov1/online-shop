const User=require('../models/User')

// const authAdmin=(req,res,next)=>{

//     try {
//         //Get User information by id
//         const user=  User.findOne({_id:req.user.id})
//         if(user.role === 0){
//             return res.status(400).json({msg: 'Admin resources access denied'});
            
//             next()
//         }

        
//     } catch (err) {
//          res.status(500).json({msg: err.message})
//     }
// }
const authAdmin= async(req,res,next)=>{

            const user= await User.findOne({_id:req.user.id})
        if(user.role == 0){
            return res.status(400).json({msg: 'Admin resources access denied'});
        }
            next()

        // if(req.user.role == 0) return res.status(400).json({msg: 'Admin resources access denied'});
        //     next();


}
module.exports=authAdmin;