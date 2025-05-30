const express = require("express");
const { mainRoute } = require("./Routes");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/v1", mainRoute);

app.listen(3000, () => {
  console.log("The server is running");
});
