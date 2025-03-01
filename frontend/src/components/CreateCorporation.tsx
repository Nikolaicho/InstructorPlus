import useCreateCorporation from "../hooks/SuperAdmin/useCreateCorporation";
import FormRedirect from "./FormRedirect";

function SuperAdmin() {
  const { createCorporation } = useCreateCorporation();
  return (
    <>
      <FormRedirect
        title="Създай Фирма"
        inputs={["ЕИК", "Име на фирма", "Адрес", "телефон"]}
        submitFunc={createCorporation}
        jsonFields={["identityNumber", "name", "adress", "telephone"]}
        destination="/logIn"
      />
    </>
  );
}
export default SuperAdmin;
