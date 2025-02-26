
const useAddDocument = () =>{
    const addDocument = async(data:any) => {
        const result = await fetch("http://localhost:8000/createNewDocument",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                data:data
            }),
            credentials:"include"
        })
        return await (result.json())
    }
    return {addDocument}
}
export default useAddDocument