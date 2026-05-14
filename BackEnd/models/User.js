// const mongoose=require("mongoose")

// const UserSchema= new mongoose.Schema({
//     email:{type:String,required:true,unique:true},
//     password:{type:String,required:true},
// })

// module.exports=mongoose.model("User",UserSchema)


// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNum:{type:String,required:true,unique:true},
    bloodGroup: { type: String, required: true },
    age:{type:Number,required:true},
    district: { type: String, required: true },
    village: { type: String, required: true },
    role: { type: String, default: 'User' },
    profileImage: { type: String, default: null },
    lastDonationDate: { type: Date, default: null }, 
    donationCount: { type: Number, default: 0 }
});


module.exports = mongoose.model("User", UserSchema);