const useMakeTransaction = () =>{
    const makeTransaction = (id:string|undefined,sum:number) =>{
        console.log(id)
        fetch("http://localhost:8000/makeTransaction",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id,
                sum:sum
            }),
            credentials:"include"
        })
    }
    return {makeTransaction}
}
export default useMakeTransaction