import "../css/notifications.css"
function NotificationsComponent(){
    return (<>
    <div className = "container absolute border border-gray-400 w-full bg-white top-[37px] lg:rounded-lg lg:w-[300px] xl:w-1/5  lg:left-[70%]  xl:left-[78%] z-50">

        <div className = "navigation flex justify-around pb-2 bg-white">
            <div className = "font-bold text-sm text-black-500">Учебни</div>
            <div>
                <div className = "selectable text-sm cursor-pointer">Други</div>
                <div className = "line"></div>
            </div>
            
            <div>
                <div className = "selectable text-sm cursor-pointer">Архивирани</div>
                <div className = "line"></div>
            </div>
        </div>

        <div className = "content pb-20 ">
            <div className = "active text-center bg-gray-200 border-t border-gray-400">Нов час на 22.12.2024</div>
            <div className="text-center border-t border-b bg-white border-gray-400">Нов теоретичен изпит на 21.12.2024</div>
        </div>

    </div>
    </>)
}
export default NotificationsComponent 