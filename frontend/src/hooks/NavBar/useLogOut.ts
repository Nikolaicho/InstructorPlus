const useLogOut = () => {
    const logOut = () => {
        fetch("http://localhost:8000/logOut",{
            method:"POST",
            credentials:"include"
        })
    }
    return {logOut}
}
export default useLogOut