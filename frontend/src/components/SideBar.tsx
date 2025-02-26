import { useNavigate } from "react-router-dom"
import useGetUserId from "../hooks/sideBar/useGetUserId"
import useIsAdmin from "../hooks/Admin/useIsAdmin"
import useIsSuperAdmin from "../hooks/sideBar/useIsSuperAdmin"
import { useState } from "react"
import PopUpForm from "./PopUpForm"
import useCreateInstructor from "../hooks/Documents/useCreateInstructor"
import useAddCar from "../hooks/Documents/useAddCar"

function SideBar(){
    const navigate = useNavigate()
    const {getUserId} = useGetUserId()
    const {isAdmin} = useIsAdmin()
    const {superAdmin} = useIsSuperAdmin()
    return(<>
    <div className = "flex flex-col w-[250px] bg-sky-700 h-screen text-white text-center  relative overflow-y-hidden overflow-hidden">
        {isAdmin == false && superAdmin == undefined ?
        <div>
            <div className = "hover:bg-sky-600 pt-2 pb-2" onClick = {()=>{
                const awaitFunction = async () => {
                    navigate("/classes/"+await getUserId())
                }
                awaitFunction()
            }}>Часове</div>
            <div className = "hover:bg-sky-600 pt-2 pb-2" onClick = {()=>{
                navigate("/createCorporation")
            }}>Създай Фирма</div>
        </div>:<></>}
        {isAdmin?
        <div>
              <div className = "hover:bg-sky-600 pt-2 pb-2" onClick = {()=>{
                    navigate("/assignClasses")
            }}>Часове</div>
            <div className = "hover:bg-sky-600 pt-2 pb-2" onClick = {()=>{
                navigate("/registry")
            }}>Регистър</div> 
        </div>
          :<></>
        }
        {
         superAdmin ?   
        <div>
            <div className = "hover:bg-sky-600 pt-2 pb-2" onClick={() => {
                navigate("/documents")
            }}>Документи</div>
            <div className = "hover:bg-sky-600 pt-2 pb-2" onClick={() => {
                navigate("/reviewRequests")
            }}>Нови курсисти</div>
           
        </div>:<></>

        }
    </div>
    </>)
}

export default SideBar