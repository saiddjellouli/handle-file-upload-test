const express = require("express");
const path = require("path");
const multer = require("multer");
const uploadController = require("../controllers/uploadController");
const { UPLOAD_DIR } = require("../config");

// Create router
const router = express.Router();

// Configure multer for file upload handling : uploaded file will be temporarly store in 'uploads' folder
const upload = multer({
  dest: UPLOAD_DIR,
});

// Define the upload post route with middleware allowing to access file from client request
router.post("/upload", upload.single("csvfile"), uploadController);

module.exports = router;
