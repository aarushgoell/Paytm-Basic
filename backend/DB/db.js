const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL);

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // It will remove the space if it is in the beginning , starting, and in both
    minLength: 3,
    lowercase: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

const AccountsSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Accounts = mongoose.model("Accounts", AccountsSchema);

module.exports = {
  User,
  Accounts,
};
