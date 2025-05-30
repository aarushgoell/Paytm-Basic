const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const tken = req.headers.authorization;
  if (!tken || !tken.startsWith("Bearer")) {
    return res.status(403).json({
      message: "You are not authenticated",
    });
  }
  const realtoken = tken.split(" ")[1];

  try {
    const check = jwt.verify(realtoken, JWT_SECRET);
    req.userid = check.userid;
    next();
  } catch (e) {
    return res.status(403).json({
      message: "You are not authenticated",
    });
  }
}

module.exports = { authMiddleware };
