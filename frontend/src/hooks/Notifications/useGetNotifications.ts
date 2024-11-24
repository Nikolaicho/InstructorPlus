import { useEffect, useState } from "react"

const useGetNotification = () =>{
    const [notifications, setNotifications] = useState<any>()
    const [notificationsLoaded,setNotificationsLoaded] = useState<boolean>(false)
    useEffect(()=>{
        const awaitFetch = async () => {
            const response = await fetch("http://localhost:8000/getNotifications",{
                method:"GET"
            })
            setNotifications(await response.json())
            setNotificationsLoaded(true)
        }
        awaitFetch()
    },[])
    return {notifications,notificationsLoaded}
}
export default useGetNotification