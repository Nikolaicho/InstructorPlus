import {Schema} from "mongoose"
import mongoose from "mongoose";

export interface userType {
  firstName:string,
  surname:string,
  lastName:string,
  telephone:string,
  email: string;
  password: string;
  role: string;
  dates: [{timestamp: number, name: string,finalDate:Date}]
}

const userSchema = new Schema<userType>({
  firstName:{
    type:String,
    required:true,
  },
  surname:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
    required:true,
  },
  telephone:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true,
  },
  dates: [{
    startDate : Date,
    name: String,
    finalDate:Date, 
  }]
});


const User = mongoose.model("User",userSchema);
export default User;