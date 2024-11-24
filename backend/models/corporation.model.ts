import { Schema } from "mongoose";
import mongoose from "mongoose";

const corporationSchema = new Schema({
    EIK:{
        type:String,
        required: true,
        unique: true,
    },
    Adress:{
        type:String,
        required:true,     
    },
})