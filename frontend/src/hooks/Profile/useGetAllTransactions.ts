import { useEffect, useState } from "react";

const useGetAllTransactions = (id:string|undefined) =>{
    const[transactions,setTransactions] = useState<any>()
    let params:URLSearchParams;
    if(id != undefined){
        params = new URLSearchParams({
            id: id,
        });
    }
    const getAllTransactions = async () => {
        let result = await fetch("http://localhost:8000/getAllTransactions?"+params,{
            method:"GET"
        })
        setTransactions(await (result.json()))
    }
    useEffect(()=>{
        getAllTransactions()
    },[])
    return {transactions}
}
export default useGetAllTransactions    