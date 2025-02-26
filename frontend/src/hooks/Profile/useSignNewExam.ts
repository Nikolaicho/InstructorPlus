const useSignNewExam = (id:string|undefined) => {
    const signNewExam = (result:string,type:string,date:string) =>{
        fetch("http://localhost:8000/signNewExam",{
            method:"POST",
            body:JSON.stringify({
                id:id,
                result:result,
                type:type,
                date:date,
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
    }
    return {signNewExam}
}
export default useSignNewExam;