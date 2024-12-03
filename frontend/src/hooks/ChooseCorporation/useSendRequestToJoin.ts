const useSendRequestToJoin = () =>{
    const sendRequestToJoin = (corporationId:string|undefined) => {
       
        fetch("http://localhost:8000/sendRequestToJoin",{
            method:"POST",
            body:JSON.stringify({
                corporationId:corporationId
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
    }
    return {sendRequestToJoin}
}
export default useSendRequestToJoin;