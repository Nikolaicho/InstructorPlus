import {Schema} from "mongoose"
import mongoose from "mongoose"
const examSchema = new Schema({
    type:String,
    date:Date,
    result:String,
    candidate:{type: Schema.Types.ObjectId, ref: 'User'}
})
const Exam = mongoose.model("Exam",examSchema);
export default Exam;