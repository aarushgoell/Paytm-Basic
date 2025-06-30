require("dotenv").config();
const express = require("express");
const { mainRoute } = require("./Routes");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use("/api/v1", mainRoute);

app.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}`);
});
