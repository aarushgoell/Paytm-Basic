const express = require("express");
const zod = require("zod");
const { User, Accounts } = require("../DB/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares/authMiddleware");
const userrRoute = express.Router();

const inputValidate = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6),
});

userrRoute.post("/signup", async (req, res) => {
  const resp = inputValidate.safeParse(req.body);
  if (!resp.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const { username, firstName, lastName, password } = req.body;

  const checkUser = await User.findOne({ username });

  if (checkUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const newUser = await User.create({
    username,
    firstName,
    lastName,
    password,
  });

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomBalance = getRandomNumber(1, 10000);

  await Accounts.create({
    userid: newUser._id,
    balance: randomBalance,
  });

  const token = jwt.sign({ userid: newUser._id }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});

const SignInInputCheck = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

userrRoute.post("/signin", async (req, res) => {
  const { success } = SignInInputCheck.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }
  const { username, password } = req.body;
  const findUser = await User.findOne({
    username: username,
    password: password,
  });
  console.log(findUser);
  if (findUser) {
    const token = jwt.sign({ userid: findUser._id }, JWT_SECRET);

    console.log(token);

    return res.status(200).json({
      token,
    });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

const dynamicUpdate = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastname: zod.string().optional(),
});

userrRoute.put("/update", authMiddleware, async (req, res) => {
  if (JSON.stringify(req.body) === "{}") {
    return res.status(411).json({
      message: "Inputs fields are empty",
    });
  }
  const { success } = dynamicUpdate.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  const userid = req.userid;
  await User.updateOne(
    { _id: userid },
    {
      $set: req.body,
    }
  );
  res.status(200).json({
    message: "Updated successfully",
  });
});

userrRoute.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  }).select({ password: 0, __v: 0 });

  res.status(200).json({
    users,
  });
});

module.exports = {
  userrRoute,
};

// First user token

// username
// "johndoe123@gmail.com"
// lastName
// "Doe"
// password
// "securePassword123"
// firstName
// "John"
// yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2ODM4ODk3YTgzODM2OWY2MGQ3OWI4NDUiLCJpYXQiOjE3NDg1MzU2NzV9.lVZvo10Xi1vuZt_ixXe1rf3c35JhANkMsq84L1w1b4o

// // 2nd user token

// {
//   "firstName": "Aarush",
//   "lastName": "Goel",
//   "username": "aarushgoel123@gmail.com",
//   "password": "securePassword123"
// }
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2ODM4OGExZjgzODM2OWY2MGQ3OWI4NGEiLCJpYXQiOjE3NDg1MzU5NjR9.ppY0MSFXYtVlCTcKwLr9z-AxMtkYb5CHbJtx2Ygx72c"
