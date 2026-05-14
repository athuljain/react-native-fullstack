const express=require('express')
const router=express.Router()
const User=require("../models/User")
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')

router.post('/register', async (req, res) => {
    try {
        // Log the body to see what is arriving from the mobile app
        console.log("Data received:", req.body); 

        const { name, email, password,contactNum, bloodGroup,age, district, village } = req.body;

        // Validation check
        if (!name || !email || !password || !contactNum || !age || !district || !village) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            contactNum,
            bloodGroup,
            age,
            district,
            village
        });

        await newUser.save();
        res.status(201).json({ message: "user created" });
    } catch (err) {
        console.error("Registration Error:", err); // Look at your terminal!
        res.status(500).json({ error: err.message });
    }
});

//Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).json({ message: "Invalid credentials" });
//   }
//   const token = jwt.sign({ id: user._id }, "SECRET_KEY");
//   res.json({ token, email: user.email });
// });


// routes/auth.js
router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;

     
       const user = await User.findOne({ 
  $or: [{ email: identifier }, { contactNum: identifier }] 
});

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: '1d' });
        res.json({ token, email: user.email, name: user.name });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

router.post('/logout', (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});


// GET User details
router.get('/profile/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// UPDATE User details
router.put('/update-profile', async (req, res) => {
    const { email, name, contactNum, district, village, profileImage } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name, contactNum, district, village, profileImage },
            { new: true }
        ).select("-password");
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});


module.exports = router;