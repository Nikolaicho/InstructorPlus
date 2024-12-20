const useCreateInstructor = () =>{
    const createInstructor = (id:string) =>{
        fetch("http://localhost:8000/createInstructor",{
            method:"POST",
            body:JSON.stringify({
                id:id
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