export interface profileInfo{
  id:string,
  firstName:string,
  surname:string,
  lastName:string,
  email:string,
  telephone:string,
}
 
export interface Transaction{
    _id:string,
    date:String,
    sum:string,
    candidateId:string,
}
/*

transactions:[{
    _id:String,
    date:String,
    sum:String,
  }],
*/