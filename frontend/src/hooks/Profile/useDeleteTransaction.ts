const useDeleteTransaction = () => {
    const deleteTransaction = (id:string) => {
        fetch("http://localhost:8000/deleteTransaction",{
            method:"POST",
            body:JSON.stringify({
                id:id
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
    }
    return {deleteTransaction}
}
 
export default useDeleteTransaction;

//return {deleteTransaction}