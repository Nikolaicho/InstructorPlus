import {Schema} from "mongoose"
import mongoose from "mongoose"

const requestSchema = new Schema({
    organization:{
        type:Schema.Types.ObjectId, ref: 'Corporation'
    },
    user:{
        type:Schema.Types.ObjectId, ref: 'User'
    }
})

const Request = mongoose.model("Corporation",requestSchema);
export default Request;