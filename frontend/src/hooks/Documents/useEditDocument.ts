const useEditDocument = () => {
    const editDocument = (data:any) =>{
        fetch("http://localhost:8000/editDocument",{
            method:"POST",
            body:JSON.stringify({
                data:data
            }),
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
        })
    }
    return {editDocument}
}
export default useEditDocument