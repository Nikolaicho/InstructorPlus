const useCreateCorporation = () => {
    const createCorporation = (data:any) => {
        fetch("http://localhost:8000/createCorporation",{
            method:"POST",

            body:JSON.stringify({
                data:data
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