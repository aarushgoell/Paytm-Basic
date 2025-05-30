const express = require("express");
const zod = require("zod");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { Accounts } = require("../DB/db");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userid = req.userid;
  const { balance } = await Accounts.findOne({ userid });

  res.status(200).json({
    balance,
  });
});

const transferValidate = zod.object({
  to: zod.string(),
  amount: zod.number(),
});

async function transferCheck(req, res, next) {
  const { success } = transferValidate.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Inputs are not correct",
    });
  }

  const userid = req.userid;

  const { balance } = await Accounts.findOne({ userid });

  if (balance < req.body.amount) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const receiverid = req.body.to;

  const check = await Accounts.findOne({ userid: receiverid });

  if (!check) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  next();
}

accountRouter.post(
  "/transfer",
  authMiddleware,
  transferCheck,
  async (req, res) => {
    const senderId = req.userid;
    const receiverId = req.body.to;
    const amount = req.body.amount;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await Accounts.findOneAndUpdate(
        { userid: senderId },
        {
          $inc: { balance: -amount },
        },
        { session }
      );

      await Accounts.findOneAndUpdate(
        { userid: receiverId },
        {
          $inc: { balance: amount },
        },
        { session }
      );

      await session.commitTransaction();
      res.status(200).json({
        message: "Transfer successful",
      });
    } catch (e) {
      await session.abortTransaction();
      res.status(400).json({
        message: "Transfer unsuccessful",
      });
    } finally {
      session.endSession();
    }
  }
);

module.exports = {
  accountRouter,
};

// To handle transactions in Mongoose, you first need to establish a session and then use that session for all related database operations. This ensures that the operations are executed as a single, atomic unit, guaranteeing consistency. You can then commit or abort the transaction, either through the session object or by using Mongoose's Connection#transaction() function.
// Here's a more detailed breakdown:
// 1. Establish a Session:
// Create a session using Mongoose.startSession() or Connection.startSession().
// You can also use Mongoose's connection-level transaction API, which provides a more convenient way to manage transactions within a connection.
// 2. Perform Operations within the Session:
// When performing database operations (e.g., find(), updateOne(), save()), always pass the session object as an option using { session }.
// Mongoose will then ensure that these operations are executed within the context of the transaction.
// 3. Commit or Abort the Transaction:
// Commit: To commit the transaction, use session.commitTransaction().
// Abort: To abort the transaction (e.g., if an error occurs), use session.abortTransaction(). This will revert all changes made within the transaction.
// Example:
// JavaScript

// const mongoose = require('mongoose');

// // Assume you have a Mongoose model 'User' and a connection established

// async function transferFunds(fromAccount, toAccount, amount) {
//   const session = await mongoose.startSession(); // Start a new session
//   session.startTransaction(); // Start the transaction

//   try {
//     // Perform operations within the transaction
//     await User.findOneAndUpdate(
//       { _id: fromAccount },
//       { $inc: { balance: -amount } },
//       { session } // Pass the session to the operation
//     );
//     await User.findOneAndUpdate(
//       { _id: toAccount },
//       { $inc: { balance: amount } },
//       { session } // Pass the session to the operation
//     );

//     // If all operations are successful, commit the transaction
//     await session.commitTransaction();
//     console.log('Transaction committed successfully!');

//   } catch (error) {
//     // If any operation fails, abort the transaction
//     await session.abortTransaction();
//     console.error('Transaction aborted due to an error:', error);
//   } finally {
//     // Always end the session
//     session.endSession();
//   }
// }

// // Example usage:
// // transferFunds('some_user_id', 'another_user_id', 100);
