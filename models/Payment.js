const mongoose =require('mongoose')

const paymentSchema= new mongoose.Schema({
    user_id:{
        type:String,
        reuired : true
    },
    name:{
        type:String,
        reuired : true
    },
    email:{
        type:String,
        reuired : true
    },
    paymentID:{
        type:String,
        reuired : true
    },
    address:{
        type:Object,
        reuired : true
    },
    cart:{
        type:Array,
        default : []
    },
    status:{
        type: Boolean,
        default : true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Payments", paymentSchema);