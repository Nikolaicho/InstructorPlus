import useCreateCorporation from "../hooks/SuperAdmin/useCreateCorporation";
import FormCreateCorporation from "../components/FormCreateCorporation"

function SuperAdmin(){
   const {createCorporation} = useCreateCorporation()
   return(<>
    <FormCreateCorporation title = "Създай Фирма" inputs = {["ЕИК","Име на фирма","Адрес","телефон"]} submitFunc = {createCorporation} jsonFields = {[  "identityNumber","name","adress","telephone"]} destination = "/logIn"/>
   </>)
}
export default SuperAdmin