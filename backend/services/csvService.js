const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { zip } = require("zip-a-folder");
const { UPLOAD_DIR, ZIP_DIR } = require("../config");

//Asynchronous function that manages fileReading, csv file writing and file zipping
const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    //We prepare two separated arrays based on gender column
    const males = [];
    const females = [];

    //we create a stream for reading csv rows row by row and pipe
    //the output to the input stream of csv-parser to map each incoming row to js object
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row.gender === "male") {
          males.push(row);
        } else if (row.gender === "female") {
          females.push(row);
        }
      })
      //We mark the callback as async so that we can use await inside (because zip function is asynchronous)
      .on("end", async () => {
        if (!fs.existsSync(UPLOAD_DIR)) {
          fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }
        const malesFilePath = path.join(uploadsDir, "/males.csv");
        const femalesFilePath = path.join(uploadsDir, "/female.csv");

        const malesCsvContent = males
          .map((e) => Object.values(e).join(","))
          .join("\n");
        const femalesCsvContent = females
          .map((e) => Object.values(e).join(","))
          .join("\n");

        fs.writeFileSync(malesFilePath, malesCsvContent);
        fs.writeFileSync(femalesFilePath, femalesCsvContent);

        if (!fs.existsSync(ZIP_DIR)) {
          fs.mkdirSync(ZIP_DIR, { recursive: true });
        }
        const zipPath = path.join(ZIP_DIR, "/result.zip");

        //Create zip.csv containing both males and females compressed files.
        //The zip function is asynchronous, the code waits for zipping to complete then resolves the promise
        //by returning the zip file path, or rejects the promise with an error
        try {
          await zip(UPLOAD_DIR, ZIP_DIR);
          fs.rmdirSync(UPLOAD_DIR, { recursive: true });
          resolve(zipPath);
        } catch (err) {
          reject(err);
        }
      });
  });
};

module.exports = { processCSV };
