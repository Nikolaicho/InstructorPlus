const useCreateCorporation = () => {
    const createCorporation = (id:string,adress:string,telephone:string,name:string) => {
        fetch("http://localhost:8000/createCorporation",{
            method:"POST",

            body:JSON.stringify({
                identityNumber:id,
                adress:adress,
                telephone:telephone,
                name:name
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
    }
    return {createCorporation}
}
export default useCreateCorporation