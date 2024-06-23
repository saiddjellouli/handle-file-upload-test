const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const tmp = require("tmp");
const { zip } = require("zip-a-folder");

//Asynchronous function that manages fileReading, csv file writing and file zipping
const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    //We prepare two separated arrays based on gender column
    const males = [];
    const females = [];

    const tempDir = tmp.dirSync({ unsafeCleanup: true });
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
        const malesFilePath = path.join(tempDir.name, "/males.csv");
        const femalesFilePath = path.join(tempDir.name, "/female.csv");

        const malesCsvContent = males
          .map((e) => Object.values(e).join(","))
          .join("\n");
        const femalesCsvContent = females
          .map((e) => Object.values(e).join(","))
          .join("\n");

        fs.writeFileSync(malesFilePath, malesCsvContent);
        fs.writeFileSync(femalesFilePath, femalesCsvContent);

        //Zip file will be created in separate temporary directory in order to avoid conflicts, maintaining separation with uploaded files
        const zipPath = path.join(
          tmp.dirSync().name,
          `${path.basename(tempDir.name)}.zip`
        );

        //Create zip.csv containing both males and females compressed files.
        //The zip function is asynchronous, the code waits for zipping to complete then resolves the promise
        //by returning the zip file path, or rejects the promise with an error
        try {
          await zip(tempDir.name, zipPath);
          tempDir.removeCallback();
          resolve(zipPath);
        } catch (err) {
          tempDir.removeCallback();
          reject(err);
        }
      });
  });
};

module.exports = { processCSV };
