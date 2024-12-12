const useRespondToRequest = () => {
    const respondToRequest = (isAccepted:boolean,userId:string,requestId:string,) => {
        fetch("http://localhost:8000/respondToRequest",{
            method:"POST",
            body:JSON.stringify({
                isAccepted:isAccepted,
                userId:userId,
                requestId:requestId,
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        })
    }
    return {respondToRequest}
}
export default useRespondToRequest