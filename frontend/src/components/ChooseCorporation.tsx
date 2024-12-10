import React from "react";
import { useState } from "react";
import useGetAllCorporations from "../hooks/ChooseCorporation/useGetAllCorporations"
import useSendRequestToJoin from "../hooks/ChooseCorporation/useSendRequestToJoin";
import { Corporation } from "../interfaces/corporation.interface";
function ChooseCorporation (){
    const {corporations} = useGetAllCorporations();
    const [selectedCorporation,setSelectedCorporation] = useState<Corporation>()
    const {sendRequestToJoin} = useSendRequestToJoin();
    return(<>
    <select onChange={(e)=>{
        if(corporations != null){
            setSelectedCorporation(corporations[parseInt(e.target.value)]);
        }
    }}>
        {corporations?.map((corporation:Corporation,key:number)=>(
            <option value = {key}>{corporation.name}{corporation._id}</option>
        ))}
    </select>
    {selectedCorporation ? 
    <div>
        <div>ЕИК:{selectedCorporation._id}</div>
        <div>Име:{selectedCorporation.name}</div>
        <div>Адрес:{selectedCorporation.adress}</div>
        <div>Телефон:{selectedCorporation.telephone}</div>
    </div>
    :<></>}
    <button onClick={()=>{
        if(selectedCorporation){
            sendRequestToJoin(selectedCorporation._id)
        }
        else{
            console.log("не си селектирал нищо")
        }
    }}>потвърди и прати зявка</button>
    </>)
}
export default ChooseCorporation