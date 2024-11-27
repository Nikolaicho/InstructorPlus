
const useDeleteDocument = () =>{
    const deleteDocument = (id:string) =>{ 
        fetch("http://localhost:8000/deleteDocument",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id
            })
        })
    }
    return {deleteDocument}
   
}
export default useDeleteDocument