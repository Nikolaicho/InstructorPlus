const useSignNewExam = () => {
    const signNewExam = (id:string|undefined,result:string,type:string) =>{
        fetch("http://localhost:8000/signNewExam",{
            method:"POST",
            body:JSON.stringify({
                id:id,
                result:result,
                type:type
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
    }
    return {signNewExam}
}
export default useSignNewExam;