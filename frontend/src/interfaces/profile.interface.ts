export interface profileInfo{
    firstName:string,
    surname:string,
    lastName:string,
    transactions:[{
      _id:String,
      date:String,
      sum:String,
    }]
  }
  
export interface Transaction{
    _id:string,
    date:String,
    sum:string,
    candidateId:string,
}