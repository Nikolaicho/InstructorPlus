import { useState } from "react"
import NavBar from "./NavBar"

function SuperAdmin(){
    const [identityNumber,setIdentityNumber] = useState<string>();
    const [adress,setAdress] = useState<string>();
    return(<>
    <NavBar/>
    
    </>)
}
export default SuperAdmin