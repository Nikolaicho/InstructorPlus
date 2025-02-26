import NavBar from "./NavBar"
import SideBar from "./SideBar"
import DownloadIcon from '@mui/icons-material/Download';

function Recordings(){
    return(
    <>
        <NavBar/>
        <div className = "flex justify-between">
            <SideBar/>
                <div className=" ml-10 mt-10 h-[550px] w-[600px]  bg-gray-500"></div>
                <div className = "h-[100vh] w-[200px] bg-sky-700 ">
                    <div className = "flex pb-2 pt-2 hover:bg-sky-600">
                        <div className = "text-white pl-4">Запис 12.12.2024</div>
                        <DownloadIcon sx={{ color: "white" }}/>
                    </div>
                    <div className = "flex pb-2 pt-2 hover:bg-sky-600">
                        <div className = "text-white pl-4">Запис 12.12.2024</div>
                        <DownloadIcon sx={{ color: "white" }}/>
                    </div>
                    <div className = "flex pb-2 pt-2 hover:bg-sky-600">
                        <div className = "text-white pl-4">Запис 12.12.2024</div>
                        <DownloadIcon sx={{ color: "white" }}/>
                    </div>
                </div>
        </div>
    </>)
}
export default Recordings