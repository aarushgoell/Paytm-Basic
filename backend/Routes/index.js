const express = require("express");
const { userrRoute } = require("./user");
const { accountRouter } = require("./account");
const mainRoute = express.Router();

mainRoute.use("/user", userrRoute);
mainRoute.use("/account", accountRouter);

module.exports = {
  mainRoute,
};
