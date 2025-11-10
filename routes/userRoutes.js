const express = require("express")
const path = require("path")
const router = express.Router();
const userController = require('../controllers/userController');
const db = require("../config/dbConfig"); // ✅ Import DB connection
const bcrypt = require("bcrypt");
const authMiddleware = require('../middleware/authMiddleware')


// ✅ Protected Route
router.get("/userProfile", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/userProfile.html"));
});

router.get('/test', (req, res) => {
  res.send('✅ userRoutes working!');
});

// ✅ GET route to serve index page
router.get("/index", (req, res)=>{
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
})

// ✅ GET route to serve login page
router.get("/login", (req, res)=>{
  res.sendFile(path.join(__dirname, "../public/html/login.html"));
})
// ✅ Login route
router.post('/login', userController.loginUser);


// ✅ GET route to serve registration page
router.get("/registration", (_, res)=>{
    res.sendFile(path.join(__dirname, "../public/html/registration.html"));
});

// API route (form submission)
router.post("/registration", userController.registerUser);

module.exports = router;