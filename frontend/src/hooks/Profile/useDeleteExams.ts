const useDeleteExams = () => {
    const deleteExam = (id:string) => {
        fetch("http://localhost:8000/deleteExam",{
            method:"POST",
            body:JSON.stringify({
                id:id
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
    }
    return {deleteExam}
}
export default useDeleteExams