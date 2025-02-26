import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import "../css/notifications.css"
import PersonIcon from '@mui/icons-material/Person';
import useLogOut from "../hooks/NavBar/useLogOut";
import Cookies from 'js-cookie';
import useGetProfileId from "../hooks/NavBar/useGetProfileId"; 

/*
<Notifications sx={{ color: '#9c9a9a' }}onClick={()=>{
          setIsNotificationsOpen(!isNotificationsOpen)
        }}fontSize="large"/>
        {isNotificationsOpen ? 
        <NotificationsComponent/>
        : <></>}
*/
function NavBar() {
  const navigate = useNavigate();
  const {logOut} = useLogOut();
  const {redirectToProfilePage} = useGetProfileId()
  return (
    <>
    <div className="bg-blue-900  flex justify-between h-[30px] items-center">
      <div className = "text-white text-xl ml-6 cursor-pointer">InstructorPlus</div>
      <div className = "text-white">{Cookies.get("corp")}</div>
      <div>
        <PersonIcon sx={{ color: 'white', marginRight:"15px"}} onClick = {()=>{
          redirectToProfilePage()
        }}/>
        <LogoutIcon sx={{ color: 'white' ,marginRight:"15px"}} onClick={()=>{
          logOut()
          navigate("/logIn")
        }}/>
      </div>
    </div>
    </>
  );
}
export default NavBar;
