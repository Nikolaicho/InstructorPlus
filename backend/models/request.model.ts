import {Schema} from "mongoose"
import mongoose from "mongoose"

const requestSchema = new Schema({
    organization:{
        type:String, ref: 'Corporation'
    },
    user:{
        type:Schema.Types.ObjectId, ref: 'User'
    }
})

const Request = mongoose.model("Request",requestSchema);
export default Request;