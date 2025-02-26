import { useNavigate } from "react-router-dom"

function UserOrFirm () {
    const navigate = useNavigate()
    return (<>
    <div className = "h-screen w-screen bg-sky-500">
        <div className = "flex-col absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className = "px-20 py-4 border-black border-2 rounded-xl mb-6 bg-sky-600 font-semibold text-center hover:bg-sky-400 cursor:pointer" onClick = {()=>{navigate("/sendRequestToFirm")}}>Потребител</div>
            <div className = "px-20 py-4 border-black border-2 rounded-xl mb-6 bg-sky-600 font-semibold text-center hover:bg-sky-400 cursor:pointer" onClick = {()=>{navigate("/createCorporation")}}>Юридическо лице</div>
        </div>
    </div>
    </>)
}
export default UserOrFirm