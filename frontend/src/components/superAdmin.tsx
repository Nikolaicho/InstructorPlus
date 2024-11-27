import { useState } from "react"
import NavBar from "./NavBar"
import useCreateCorporation from "../hooks/SuperAdmin/useCreateCorporation";
import useCreateInstructor from "../hooks/SuperAdmin/useCreateInstructor";

function SuperAdmin(){
    const [identityNumber,setIdentityNumber] = useState<string>("");
    const [adress,setAdress] = useState<string>("");
    const [telephone,setTelephone] = useState<string>("")
    const [name,setName] = useState<string>("")
    const [id,setId] = useState<string>("")

    const {createCorporation} = useCreateCorporation()
    const {createInstructor} = useCreateInstructor();
    return(<>
    <NavBar/>
    eik
    <input  onChange = {(e)=>{
        setIdentityNumber(e.target.value);
    }}/>
    adres
    <input onChange={(e)=>{
        setAdress(e.target.value)
    }}/>
    telefon
    <input onChange={(e)=>{
        setTelephone(e.target.value)
    }}/>
    ime
    <input onChange={(e)=>{
        setName(e.target.value)
    }}/>
    <button onClick = {()=>{
        createCorporation(identityNumber,adress,telephone,name)
    }}>suzdai</button>
    
    <input onChange={(e)=>{
        setId(e.target.value)
    }}></input>
    <button onClick={()=>{
        createInstructor(id);
    }}>povishi</button>
    </>
    )
}
export default SuperAdmin