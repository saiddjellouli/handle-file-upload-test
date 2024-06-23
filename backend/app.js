const express = require("express");
const cors = require("cors");
const routes = require("./routes/uploadRoute");

const app = express();
const port = 3001;

//Allows client to make requests to server
app.use(cors());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
