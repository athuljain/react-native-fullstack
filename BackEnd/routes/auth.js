const express=require('express')
const router=express.Router()
const User=require("../models/User")
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
const BloodRequest=require("../models/BloodRequest")



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






router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const user = await User.findOne({ $or: [{ email: identifier }, { contactNum: identifier }] });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: '1d' });
        
        // Include the role in the response
        res.json({ 
            token, 
            email: user.email, 
            name: user.name, 
            role: user.role 
        });
    } catch (err) {
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
    const { email, name, contactNum, district, village, profileImage, lastDonationDate, donationCount } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name, contactNum, district, village, profileImage, lastDonationDate, donationCount },
            { new: true }
        ).select("-password");
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});



// POST: Create a blood request
router.post('/blood-request', async (req, res) => {
    try {
        const newRequest = new BloodRequest(req.body);
        await newRequest.save();
        res.status(201).json({ message: "Request submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Fetch all requests for Admin
router.get('/all-requests', async (req, res) => {
    try {
        const requests = await BloodRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch requests" });
    }
});

router.get('/all-donors', async (req, res) => {
    try {
        // Fetch users where role is 'User' (ignore admins)
        // .select("-password") is very important for security!
        const donors = await User.find({ role: 'User' }).select("-password");
        
        console.log("Donors found:", donors.length); // Check your server terminal
        res.status(200).json(donors);
    } catch (err) {
        console.error("Error in /all-donors:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;