const express=require('express')
const router=express.Router()
const User=require("../models/User")
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')

//Register
router.post('/register',async (req,res)=>{
    try{
        const {email,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            email,password:hashedPassword
        })
        await newUser.save();
        res.status(201).json({message:"user created"})
    }catch(err){
        res.status(500).json({error:err.message})
    }
})


//Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, "SECRET_KEY");
  res.json({ token, email: user.email });
});

router.post('/logout', (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;