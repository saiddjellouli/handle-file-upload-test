const express = require("express");
const path = require("path");
const multer = require("multer");
const uploadController = require("../controllers/uploadController");

// Create router
const router = express.Router();

// Configure multer for file upload handling : uploaded file will be temporarly store in 'uploads' folder
const upload = multer({
  dest: path.join(__dirname, "uploads/"),
});

// Define the upload post route
router.post("/upload", upload.single("csvfile"), uploadController);

module.exports = router;
