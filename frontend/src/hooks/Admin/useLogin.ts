import React from "react";
import { useState } from "react";

const useLogIn = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const logIn = async () =>{
        const response = await fetch("http://localhost:8000/logIn ", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
        });
    }
    return {setEmail,setPassword,logIn}
}
export default useLogIn