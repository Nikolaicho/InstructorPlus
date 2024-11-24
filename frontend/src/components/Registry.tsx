import useGetAllCandidates from "../hooks/Registry/useGetAllCandidates"
import NavBar from "./NavBar"
import { useNavigate } from "react-router-dom";

function Registry(){
    const {userInfo,isInfoLoaded} = useGetAllCandidates()
    const navigate = useNavigate();

    return(<>
    <NavBar/>
        {isInfoLoaded ? <div>
            {userInfo?.map((user:any,key:number)=>(
                <div className = "flex">
                    <div>{user.firstName} {user.lastName} </div>
                    <div className="ml-10" onClick = {()=>{
                        navigate(`/profile/${user._id}`)
                    }}>покажи профил</div>
                </div>
            ))}
        </div> :<></>}
    </>)
    
}
export default Registry