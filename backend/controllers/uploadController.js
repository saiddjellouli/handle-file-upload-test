const fs = require("fs");
const { processCSV } = require("../services/csvService");

// Define the upload controller
const uploadController = async (req, res) => {
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
};

module.exports = uploadController;
