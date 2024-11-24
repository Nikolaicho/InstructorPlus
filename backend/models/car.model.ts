import { Schema } from "mongoose";
import mongoose from "mongoose";

const carSchema = new Schema({
    _id:String,
    model:String,
    brand:String,
})
const Car = mongoose.model("Car",carSchema);
export default Car;