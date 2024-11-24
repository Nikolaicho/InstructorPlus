import { Button, Input } from "@nextui-org/react";
import useLogIn from "../hooks/Admin/useLogin";
import NavBar from "./NavBar";
function LogIn() {
  const { setEmail, setPassword, logIn } = useLogIn();
  return (
    <>
      <NavBar />
      <h1>Log In</h1>
      <Input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></Input>
      <Input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></Input>
      <Button onClick={logIn} color="primary">
        Button
      </Button>
    </>
  );
}

export default LogIn;
