import useGetAllCandidates from "../hooks/Registry/useGetAllCandidates"
import NavBar from "./NavBar"
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import useIsAdmin from "../hooks/Admin/useIsAdmin";


function Registry(){
    const {userInfo} = useGetAllCandidates()
    const navigate = useNavigate();
    const {isAdmin} = useIsAdmin()
    return(<>
    {isAdmin?
    <div>
        <NavBar/>
        <div className = "flex">
            <SideBar/>
            <div className = "w-full">
                {userInfo?.map((user:any,key:number)=>(
                    <div className = "flex ml-4 mb-4 mt-2">
                        <div className = "text-2xl">{user.firstName} {user.lastName}</div>
                        <div className = "ml-auto mr-4 text-xl bg-gray-400 rounded-lg px-2 border-black border-2 font-semibold" onClick = {()=>{
                            navigate(`/profile/${user._id}`)
                        }}>Покажи профил</div> 
                    </div>
                ))}
            </div>
        </div>
    </div>
    :<></>}
   </>)

}
export default Registry