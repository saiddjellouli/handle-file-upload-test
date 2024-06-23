const path = require("path");

// Define the base upload and zip directories
const UPLOADS_DIR = path.join(__dirname, "uploads");
const ZIP_DIR = path.join(__dirname, "zip");

module.exports = {
  UPLOADS_DIR,
  ZIP_DIR,
};
