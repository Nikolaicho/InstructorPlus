import NavBar from "./NavBar"
import useGetCandidateInfo from "../hooks/Profile/useGetCandidateInfo"
import { useParams } from 'react-router';
import useMakeTransaction from "../hooks/Profile/useMakeTransaction";
import { useState } from "react";
import useSignNewExam from "../hooks/Profile/useSignNewExam";
import useGetAllExams from "../hooks/Profile/useGetAllExams"

function Profile(){
    const {id} = useParams() 

    const {userInfo,isLoaded} = useGetCandidateInfo(id)

    const {makeTransaction} = useMakeTransaction();
    const {signNewExam} = useSignNewExam();
    useGetAllExams(id)

    const [sum,setSum] = useState(0)
    const [typeOfExam,setTypeOfExam] = useState<string>("theoretical")
    const [examResults,setExamResult] = useState<string>("yes")

    return(
    <>
    <NavBar/>
    
    {isLoaded ? <div>
        {userInfo.transactions.map((transaction:any,key:number)=>(
            <div className="mb-4">номер на транзакциятa:{transaction._id} <br/> {transaction.sum} лева <br/> дата:{transaction.date}</div>
        ))}
        <div className="mb-4">
            {userInfo.firstName} {userInfo.lastName}
        </div>
        
    </div>:<></>}

    <div>
    <input className="border-1 border-black" onChange={(e)=>{
        setSum(parseInt(e.target.value))
    }}></input>

    <button onClick = {()=>{
        makeTransaction(id,sum)
    }}>Направи плащане</button>
    </div>
    
        <select onChange={(e)=>{
            setTypeOfExam(e.target.value)
        }}>
            <option value="theoretical">теоритичен</option>
            <option value="practical">практически</option>
        </select>
        <select onChange={(e)=>{
            setExamResult(e.target.value)
        }}>
            <option value="yes">да</option>
            <option value="no">не</option>
        </select>
        <button onClick={()=>{
            signNewExam(id,examResults,typeOfExam)
        }}>запази изпит</button>
    </>

    )
}
export default Profile