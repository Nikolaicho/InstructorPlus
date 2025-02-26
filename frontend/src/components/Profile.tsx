import NavBar from "./NavBar"
import useGetCandidateInfo from "../hooks/Profile/useGetCandidateInfo"
import { useParams } from 'react-router';
import useMakeTransaction from "../hooks/Profile/useMakeTransaction";
import { useState } from "react";
import useGetAllExams from "../hooks/Profile/useGetAllExams"
import SideBar from "./SideBar";
import ProfileCard from "./ProfileCard";
import TableForProfile from "./TableForProfile";
import useGetAllTransactions from "../hooks/Profile/useGetAllTransactions";
import PopUpForm from "../components/PopUpForm"
import ExamsPopUp from "../components/ExamsPopUp"
import useIsAdmin from "../hooks/Admin/useIsAdmin";

function Profile(){
    
    const {id} = useParams() 
    const {userInfo} = useGetCandidateInfo(id)
    const {makeTransaction} = useMakeTransaction(id);
    const {exams} = useGetAllExams(id);
    const {transactions} = useGetAllTransactions(id)
    const [popUpActive,setPopUpActive] = useState<number>(0)
    const { isAdmin } = useIsAdmin();
   return(<>
   <NavBar/>
   <div className = " flex">
     <SideBar/>
    {popUpActive == 1 ? 
        <div><PopUpForm rows = {["Заплатена сума:"]} isDate = {false} isSubmitDocument={false} submitFunc = {makeTransaction} jsonFields = {["sum"]} setButton={setPopUpActive}/></div> 
        : 
        popUpActive == 2 
        ?
        <ExamsPopUp id={id} setButton={setPopUpActive}/>
        :
        <></>
    }
     <div className="w-full flex">
        
        <ProfileCard info = {userInfo}/>
        <div className = "relative w-full ml-10 ">
        {isAdmin ?<div>
            <div className = "absolute right-[20px] top-[5px] px-2 rounded-lg font-semibold border-black border-2 bg-sky-500" onClick = {()=>{
            setPopUpActive(1)
            }}>Добави плащане</div>
            <div className = "absolute right-[25%] top-[5px] px-2 rounded-lg font-semibold border-black border-2 bg-sky-500" onClick = {()=>{
            setPopUpActive(2)
            }}>Добави изпит</div>
        </div>:<></> }
        
        
        <div className = "mt-16">
            <TableForProfile
                title = "Преминали изпити"
                rows={exams ? exams.map((exam:any) => ({
                    event: exam.type,
                    date: exam.date,
                    result: exam.result,
                    id:exam.id,
                })):[]} 
                isPayments = {false}
            />
  
            <TableForProfile
            title = "Плащания" 
            rows={transactions ? transactions.map((transaction:any) => ({
                event: transaction.sum,
                date: transaction.date,
                result: undefined,
                id:transaction.id
            })):[]} 
            isPayments={true}/>
        </div>
            
        </div>
     </div>
   </div>   
   
   </>)
}
export default Profile