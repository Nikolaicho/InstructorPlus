import {useState} from "react"
import {StatusCodes} from 'http-status-codes';

const useAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [firstName,setFirstName] = useState <string>()
    const [surname,setSurname] = useState<string>()
    const [lastName,setLastName] = useState<string>()
    const [telephone,setTelephone] = useState<string>()

    async function SignIn() {

      const response = await fetch("http://localhost:8000/register ", {
        method: "POST",
        body: JSON.stringify({
          firstName:firstName,
          surname:surname,
          lastName:lastName,
          email: email,
          password: password,
          telephone:telephone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      if(response.status === StatusCodes.CONFLICT)
        setErrorMessage((await response.json()).message);
      else
        setErrorMessage(null);
    }

    return {setEmail, setPassword, SignIn, errorMessage,setFirstName,setSurname,setLastName,setTelephone};
}

export default useAuth;