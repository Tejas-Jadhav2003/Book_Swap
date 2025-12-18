const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const bookController = require("../controllers/bookController");

// Multer (store image in memory)
const upload = multer();

function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "Please log in first",
            redirect: "/login"
        });
    }
    next();
}

router.get("/mybook", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/myBook.html"));
});

// POST → Add Book
router.post("/add-book", requireLogin, upload.single("image"), bookController.addBook);

module.exports = router;
