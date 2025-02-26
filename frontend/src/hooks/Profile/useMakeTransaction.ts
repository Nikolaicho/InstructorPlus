const useMakeTransaction = (id:string|undefined) =>{
    const makeTransaction = (data:any) =>{
        
        fetch("http://localhost:8000/makeTransaction",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id,
                data:data
            }),
            credentials:"include"
        })
    }
    return {makeTransaction}
}
export default useMakeTransaction