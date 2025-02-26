import { useEffect, useState } from "react";

const useIsSuperAdmin = () => {
    const [superAdmin,setSuperAdmin] = useState<boolean|null>(null)
    const isSuperAdmin = async() => {
        let res = await fetch("http://localhost:8000/isAdmin",{
            method:"GET",
            headers: {
               "Content-Type": "application/json",
            } ,
            credentials:"include",
         }).then((res)=>{
            return res.json();
         });
         
         return res.isSuperAdmin;
      }
    useEffect(()=>{
        const awaitFunction = async () => {
            setSuperAdmin(await isSuperAdmin())
        }
        awaitFunction()
    },[])
    return {superAdmin}
}
export default useIsSuperAdmin