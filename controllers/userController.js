const db = require('../config/dbConfig');
const bcrypt = require('bcrypt'); // to hash passwords

exports.registerUser = async (req, res) => {
    //  console.log("Incoming body:", req.body);
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }    

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO Users (userName, email_Id, phone, password) VALUES (?, ?, ?, ?)`;
    db.query(sql, [fullName, email, phone, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error saving user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter email and password' });
    }

    const sql = `SELECT * FROM Users WHERE email_Id = ?`;
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      // ✅ Create session
      req.session.user = {
        id: user.userId,
        name: user.userName,
        email: user.email_Id
      };

      console.log("✅ Session created:", req.session.user);

      // ✅ Respond with JSON (not redirect)
      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        redirect: '/userProfile'
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
