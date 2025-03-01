import useLogIn from "../hooks/Admin/useLogin";
import Form from "../components/Form";

function LogIn() {
  const { logIn } = useLogIn();

  return (
    <>
      <Form
        title="Влез"
        inputs={["Имейл", "Парола"]}
        submitFunc={logIn}
        jsonFields={["email", "password"]}
      />
    </>
  );
}

export default LogIn;
