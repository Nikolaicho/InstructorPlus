
const useAddDocument = () =>{
    const addDocument = (type:string,documentName:string,description:string,relatedTo:string|undefined,date:Date) => {
        
        fetch("http://localhost:8000/createNewDocument",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                type:type,
                name:documentName,
                description:description,
                relatedTo:relatedTo,
                date:date,
            }),
            credentials:"include"
        })
    }
    return {addDocument}
}
export default useAddDocument