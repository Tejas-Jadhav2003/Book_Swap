const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require("./routes/userRoutes");
const session = require('express-session');

app.use(session({
  secret: "bookswap_secret_key",  // use a strong random string in production
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false} // set true only if using HTTPS
}))

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, HTML, JS, Images)
app.use(express.static('public'));

// Default route → redirect to homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// ✅ Use routes
app.use("/", userRoutes);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
