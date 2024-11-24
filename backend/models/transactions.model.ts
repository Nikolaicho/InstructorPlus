import { Schema } from "mongoose";
import mongoose from "mongoose";
import userSchema from "./user.models"

let transactionSchema = new Schema({
    date:Date,
    sum:Number,
    candidate:{ type: Schema.Types.ObjectId, ref: 'User' }
})

const Transaction = mongoose.model("Transaction",transactionSchema);
export default Transaction;