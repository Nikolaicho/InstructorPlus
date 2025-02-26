import { profileInfo } from "../interfaces/profile.interface"
interface ProfileCardProps {
    info: profileInfo | undefined
    
} 

const ProfileCard:React.FC<ProfileCardProps> = ({info}) => {
    return(<>
    <div className = "h-[55vh] bg-gray-300 w-[60%] rounded-xl relative border-2 border-black content-box ml-10 mt-4">
        <div className = "mt-[13%]">
        <div className = "flex">
            <div className = "pl-6">Име</div>
            <div className = "absolute left-1/2 transform -translate-x-1/2">{info?.firstName}</div>
        </div>
        <div className = "flex pt-4">
            <div className = "pl-6">Презиме</div>
            <div className = "absolute left-1/2 transform -translate-x-1/2">{info?.surname}</div>
        </div>
        <div className = "flex pt-4">
            <div className = "pl-6">Фамилия</div>
            <div className = "absolute left-1/2 transform -translate-x-1/2">{info?.lastName}</div>
        </div>
        <div className = "flex pt-4">
            <div className = "pl-6">Телефон</div>
            <div className = "absolute left-1/2 transform -translate-x-1/2">{info?.telephone}</div>
        </div>
        <div className = "flex pt-4">
            <div className = "pl-6">Имейл</div>
            <div className = "absolute left-[30%] text-sm">{info?.email}</div>
        </div>
        <div className = "flex pt-4">
            <div className = "text-sm pl-6">Идентификационен <br/>номер</div>
            <div className = "absolute left-[50%] transform  text-[12px]">{info?.id}</div>
        </div>
        </div>
    </div>        
    </>)
}
export default ProfileCard