import {Schema} from "mongoose"
import mongoose from "mongoose";

const documentSchema = new Schema({
    type:String,
    name:String,
    description:String,
    date:Date,
    relatedTo:{
        type:Schema.ObjectId
    },
})
const Document = mongoose.model("Document",documentSchema);
export default Document;