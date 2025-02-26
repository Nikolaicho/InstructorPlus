import Form from "../components/Form"
import useAuth from "../hooks/Register/useAuth"
import FormCreateCorporation from "./FormCreateCorporation"
function Register () {
    const {Register} = useAuth()
    return(<>
    <FormCreateCorporation title = "Регистрирай се" inputs={["Име","Презиме","Фамилия","Имейл","Телефон","Парола"]} submitFunc = {Register} jsonFields = {["firstName","surname","lastName","email","telephone","password"]} destination="/userOrFirm"></FormCreateCorporation>
    </>)
    
}
export default Register