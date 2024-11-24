import React from "react";
import "../App.css";
import NavBar from "./NavBar";
import { Button, NextUIProvider, Input, Card } from "@nextui-org/react";
import useAuth from "../hooks/Admin/useAuth";

function App() {
  const { setEmail, setPassword, SignIn, errorMessage,setFirstName,setSurname,setLastName,setTelephone } = useAuth();
  return (
    <NextUIProvider>
      <NavBar />
      <div className="form">
        <Card
          isBlurred
          className="modal border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <Input 
          type="firstName"
          label="Име"
          onChange = {(e)=>{
            setFirstName(e.target.value)
          }}
          className="mb-4"
          />
          <Input 
          type="surname"
          label="Презиме"
          onChange = {(e)=>{
            setSurname(e.target.value)
          }}
          className="mb-4"
          />
          <Input 
          type="lastName"
          label="Фамилия"
          onChange = {(e)=>{
            setLastName(e.target.value)
          }}
          className="mb-4"
          />
          <Input 
          type="telephone"
          label="Телефон"
          onChange = {(e)=>{
            setTelephone(e.target.value)
          }}
          className="mb-4"
          />

          <Input
            type="email"
            label="И-мейл"
            className="max-w-xs mb-4"
            variant="flat"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            isInvalid={errorMessage != null}
            errorMessage={errorMessage}
          />
          <Input
            type="password"
            label="Парола"
            className="max-w-xs mb-4"
            variant="flat"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
    
          <Button onClick={SignIn} color="primary">
            Регистрирай се
          </Button>
        </Card>
      </div>
    </NextUIProvider>
  );
}

export default App;
