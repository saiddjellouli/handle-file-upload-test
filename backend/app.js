const express = require("express");
const routes = require("./routes");

const app = express();
const port = 3001;

app.use("/upload", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
