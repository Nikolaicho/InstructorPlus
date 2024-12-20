import { useEffect, useState} from "react"
import NavBar from "./NavBar"
import useGetNotifications from "../hooks/Notifications/useGetNotifications";
import { Notification } from "../interfaces/notification.interface";
function Notifications(){
    const {notifications,notificationsLoaded} = useGetNotifications()
    return(<>
    <NavBar/>
    <h1>notifications</h1>
    {notificationsLoaded ? notifications?.map((notification:Notification,key:number)=>(
        <div>{notification.name} {notification.description} {notification.date} {notification.relatedTo}</div>
    )):<></>}
    </>)
}
export default Notifications