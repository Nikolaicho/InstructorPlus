const useGetUserId = () => {
    const getUserId = async () => {
        const result = await fetch("http://localhost:8000/getProfileId",{
            method:"GET",
            credentials:"include"
        })
        return (await result.json()).id
    }
    return {getUserId}
}
export default useGetUserId