import React from "react";
import { useState } from "react";

interface UserInfo {
  role: string;
  id: string;
}

const useLogIn = () => {
    const logIn = async (data:any) =>{
        const response = await fetch("http://localhost:8000/logIn ", {
            method: "POST",
            body: JSON.stringify({
              data:data
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const result:UserInfo = await response.json()
        return result
    }
    return {logIn}
}
export default useLogIn


