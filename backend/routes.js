const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { processCSV } = require("./fileHandler");

// Create router
const router = express.Router();

// Configure multer for file upload handling : uploaded file will be temporarly store in 'uploads' folder
const upload = multer({
  dest: path.join(__dirname, "uploads/"),
});

// Define the upload post route
router.post("/upload", upload.single("csvfile"), async (req, res) => {
  const filePath = req.file.path;
  try {
    const zipPath = await processCSV(filePath);
    //Send to the client a prompt to trigger zip file download
    res.download(zipPath, "result.zip", (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error while downloading the file");
      } else {
        fs.unlink(filePath, (error) => {
          if (error) console.log(error);
        });
        fs.unlink(zipPath, (error) => {
          if (error) console.log(error);
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while processing CSV file");
  }
});

module.exports = router;
