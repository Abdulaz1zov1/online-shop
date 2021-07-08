const mongoose =require('mongoose')

const UserSchema=mongoose.Schema({
    name:{ 
        type : String,
        required : [true , 'Iltimos ismingizni kiriting'],
        trim: true
    },
    email:{ 
        type : String,
        required : [true , 'Iltimos pochtangizni kiriting'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , 'Iltimos pochtangizni tekshiring'],
        unique : [true , `Bu pochta allaqachon registratsiyadan o'tgan`],
        trim: true,
    },
    password: { 
        type : String,
        required : [true , 'Iltimos parolni kiriting']
    },
    role:{
        type:Number,
        default:0
    },
    cart:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
})

module.exports=mongoose.model('User',UserSchema );