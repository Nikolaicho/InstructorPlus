import useGetAllRequests from "../hooks/ReviewRequests/useGetAllRequests"
import useRespondToRequest from "../hooks/ReviewRequests/useRespondToRequest";
function ReviewRequests(){
    const {requests} = useGetAllRequests();
    const {respondToRequest} = useRespondToRequest()
    return(<>
    {requests ? requests.map((request:any)=>(
        <div>
            <div>{request.firstName} {request.lastName}</div>
            <button onClick={()=>{
                respondToRequest(true,request.userId,request.requestId)
            }}>Приеми</button>
            <button onClick={()=>{
                respondToRequest(false,request.userId,request.requestId)
            }}>Откажи</button>
        </div>
        
    )):<></>}
    <h1>safasfas</h1>
    </>)
}
export default ReviewRequests