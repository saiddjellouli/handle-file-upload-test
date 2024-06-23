const path = require("path");
const os = require("os");

const UPLOADS_DIR = path.join(__dirname, "uploads");
const TEMP_DIR = path.join(os.tmpdir(), "zip-temp");

module.exports = {
  UPLOADS_DIR,
  TEMP_DIR,
};
