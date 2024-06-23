const fs = require("fs");
const { processCSV } = require("../services/csvService");

// Define the upload controller
const uploadController = async (req, res) => {
  //File path access allowed by multer middleware
  const filePath = req.file.path;

  try {
    const zipPath = await processCSV(filePath);
    //Sends the zip file supposed to be downloaded by the client
    res.download(zipPath, "result.zip", (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error while downloading the file");
      }
    });
    //Executes cleaning operations after server operation finished
    res.on("finish", () => {
      // Deletes the zip file
      fs.unlink(zipPath, (err) => {
        if (err) {
          console.error("Error deleting zip file:", err);
        } else {
          //Can be removed
          console.log("Zip file deleted successfully");
        }
      });
    });
  } catch (error) {
    console.error("Error processing CSV:", error);
    res.status(500).send("Error while processing CSV file");
  }
};

module.exports = uploadController;
