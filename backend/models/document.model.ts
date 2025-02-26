import {Schema} from "mongoose"
import mongoose from "mongoose";

const documentSchema = new Schema({
    name:String,
    date:Date,
    relatedTo:String,
    organization:{
        type:String,
        ref:"Corporation"
    }
})
const Document = mongoose.model("Document",documentSchema);
export default Document;