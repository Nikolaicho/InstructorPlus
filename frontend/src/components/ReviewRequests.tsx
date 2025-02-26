import useGetAllRequests from "../hooks/ReviewRequests/useGetAllRequests"
import useRespondToRequest from "../hooks/ReviewRequests/useRespondToRequest";
import NavBar from "./NavBar"
import SideBar from "./SideBar";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

function ReviewRequests(){
    function removeRequestFromUi(index:number){
        const temp = [...requests]
        temp.splice(index,1)
        setRequests(temp)
    }

    const {requests,setRequests} = useGetAllRequests();
    const {respondToRequest} = useRespondToRequest()
    return(<>
        <NavBar/>
        <div className = "flex">
            <SideBar/>
            <div className = "w-full">
                {requests ? requests.map((request:any,index:number)=>(
                <div className = "flex flex-row items-center mt-4 ml-4">
                    <div className = "text-2xl">{request.firstName} {request.lastName}</div>
                    <div className = "bg-green-500 rounded-lg px-2 border-2 border-black ml-auto mr-4 ">
                        <div><DoneIcon fontSize="large" onClick = {()=>{
                            respondToRequest(true,request.userId,request.requestId)
                            removeRequestFromUi(index)
                        }} /></div>
                    </div>
                    <div className = "bg-red-500 rounded-lg px-2 border-2 border-black mr-4">
                        <div><CloseIcon fontSize="large" onClick = {()=>{
                            respondToRequest(false,request.userId,request.requestId)
                            removeRequestFromUi(index)
                        }} /></div>
                    </div>
                </div>
            )):<></> }
         </div>
        </div>
        </>)
}
export default ReviewRequests