import { Schema } from "mongoose";
import mongoose from "mongoose";

const corporationSchema = new Schema({
    _id:{
        type:String,
        
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    adress:{
        type:String,
        required:true,     
    },
    telephone:{
        type:String,
        required:true,
        
    }
})

const Corporation = mongoose.model("Corporation",corporationSchema);
export default Corporation;