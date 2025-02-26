function useDeleteClass() {
    async function deleteClass(classId:string){
        fetch("http://localhost:8000/deleteClass",{
            method:"POST",
            body:JSON.stringify({
                classId:classId
            }),
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
    return{deleteClass}
}
export default useDeleteClass