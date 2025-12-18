const db = require("../config/dbConfig");

// 📌 Add Book Controller
exports.addBook = (req, res) => {
    const { title, author, description, category, condition } = req.body;
    const userId = req.session.user?.id;

    if (!userId) {
        return res.status(401).json({ success: false, message: "User not logged in" });
    }

    if (!title || !author || !category || !condition) {
        return res.status(400).json({
            success: false,
            message: "All required fields must be filled"
        });
    }

    const imageBuffer = req.file ? req.file.buffer : null;

    const sql = `
        INSERT INTO Books (userId, bookTitle, Author, description, category, condition, image, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Available')
    `;

    db.query(
        sql,
        [userId, title, author, description, category, condition, imageBuffer],
        (err, result) => {
            if (err) {
                console.error("❌ Insert Book Error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            return res.status(200).json({
                success: true,
                message: "Book added successfully",
                redirect: "/mybook"
            });
        }
    );
};
