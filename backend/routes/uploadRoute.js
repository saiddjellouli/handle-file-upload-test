const express = require("express");
const tmp = require("tmp");
const multer = require("multer");
const uploadController = require("../controllers/uploadController");

// Create router
const router = express.Router();

// Configure multer for file upload handling : we define a third temp folder storing the incoming file from client
const upload = multer({ dest: tmp.dirSync({ unsafeCleanup: true }).name });

// Define the upload post route with middleware allowing to access file from client request
router.post("/upload", upload.single("csvfile"), uploadController);

module.exports = router;
