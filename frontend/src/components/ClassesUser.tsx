import NavBar from "./NavBar"
import SideBar from "./SideBar"
import useGetAllClasses from "../hooks/ClassesUser/useGetAllClasses"
import { useParams } from "react-router-dom"
import useIsAdmin from "../hooks/Admin/useIsAdmin"

function ClassesUser(){
    const {id} = useParams() 
    const {classes} = useGetAllClasses(id)
    const {isAdmin} = useIsAdmin()
    return(
        <>
            <NavBar/>
                <div className = "flex">
                    <SideBar/>
                    <div className = "flex flex-col w-full items-center">
                        {classes? classes.map((oneClass:any) => (
                            <div className="flex bg-green-500 border-2 border-black mt-4 py-2 w-[70%] justify-between font-semibold">
                                <div>{oneClass.firstNameInstructor} {oneClass.lastNameInstructor}</div>
                                <div className = "mr-2">{oneClass.start}-{oneClass.end}</div>
                            </div>
                        )):<></>}            
                    </div>
                </div>

        </>
    )
}

export default ClassesUser