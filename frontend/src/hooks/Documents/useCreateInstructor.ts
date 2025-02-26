const useCreateInstructor = () =>{
    const createInstructor = (data:any) =>{
        fetch("http://localhost:8000/createInstructor",{
            method:"POST",
            body:JSON.stringify({
                data:data
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        })
    }
    return {createInstructor}
}
export default useCreateInstructor