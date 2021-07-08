const User = require('../models/User')
const Payments = require('../models/Payment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.userCreate = {
    register:async (req,res)=>{
    try{
        const {name,email,password } = req.body;
 
        const user=await User.findOne({email})
        if(user) return res.status(400).json({msg:'Bu emaildan allaqchon foydalanilgan'})
        if(password.length<6)
        return res.status(400).json({msg:'Password kamida 6 ta belgidan iborat bo\'lishi kerak'})

        //Password Encryption
        // const passwordHash= await bcrypt.hash(password,10)
        const salt = await bcrypt.genSaltSync(12);
         const passwordHash = await bcrypt.hashSync(req.body.password , salt);
    const userNew = new User({
        name: req.body.name,
        email:req.body.email,
        password: passwordHash
    })
        await userNew.save()
        const accessToken=createAccessToken({id:userNew._id})
        const refreshtoken=createRefreshToken({id:userNew._id})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly:true,
            path:'/user/refresh_token',
            maxAge: 7*24*60*60*1000 //7d
        })

        res.json({accessToken})


    }catch (err){
        res.status(500).json({msg:err.message})
    }
},
     login: async (req,res) =>{
       try{

        await User.findOne({email: req.body.email} , (error,user)=>{
            if(error){
                res.send(error)
            }else{
                if(!user) return res.status(400).json({msg:'User does not exist.'})
        
                const isMatch= bcrypt.compareSync(req.body.password, user.password);
                if(!isMatch) return res.status(400).json({msg:'Incorrect password.'})
        
                const accessToken=createAccessToken({id:user._id})
                const refreshtoken=createRefreshToken({id:user._id})
        
                res.cookie('refreshtoken', refreshtoken, {
                    httpOnly:true,
                    path:'/user/refresh_token',
                    maxAge: 7*24*60*60*1000 //7d
                })
        
                res.json({accessToken})
            }
        })
       
    }catch (err){
        res.status(500).json({msg:err.message})
    }


},
     logout: async (req,res)=>{
    try {
        res.clearCookie('refreshtoken',{path:'/user/refresh_token'} )
        return res.json({msg:'Logged out.'})
        
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
},
    refreshToken: (req,res)=>{
        try{
            const rf_token=req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg:"Please login or regoster"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
                if(err) return res.status(400).json({msg:"Please login or regoster"})
                const accessToken=createAccessToken({id:user.id})

                res.json({accessToken})
            })

        }catch (err){
        res.status(500).json({msg:err.message})
    }
    },
    getUser: async (req,res)=>{
        try {
            const user=await User.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: 'User does not exist.'})
            res.json(user)
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    },
    addCart: async (req,res) => {
        try {
            const user= await User.findById(req.user.id)
            if(!user) return res.status(400).json({msg:'User does not exist.'})
            await User.findOneAndUpdate({_id:req.user.id},{
                cart:req.body.cart
            })

            return res.json({msg:'Added to cart'})
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    },
    history: async (req,res) =>{
        try {
            const history =await Payments.find({user_id:req.user.id})

            res.json(history)
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    }

}
const createAccessToken=(user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
}
const createRefreshToken=(user)=>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
}
