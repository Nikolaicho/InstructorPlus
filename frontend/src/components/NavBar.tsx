import { useNavigate } from "react-router-dom";
import useGetNumberOfNotifications from "../hooks/NavBar/useGetNumberOfNotifications";

function NavBar() {
  const navigate = useNavigate();
  const {number} = useGetNumberOfNotifications()
  return (
    <>
      <div className="text-bold  flex  bg-sky-500">
        <div
          className="cursor-pointer p-2 h-full hover:bg-white"
          onClick={() => {
            navigate("/logIn");
          }}
        >
          Влез
        </div>
        <div
          className="cursor-pointer p-2 h-full hover:bg-white"
          onClick={() => {
            navigate("/");
          }}
        >
          Регистрирай
        </div>
        <div
          className="cursor-pointer p-2 h-full hover:bg-white"
          onClick={() => {
            navigate("/admin");
          }}
        >
          Часове
        </div>
        <div
          className="cursor-pointer p-2 h-full hover:bg-white"
          onClick={() => {
            navigate("/documents");
          }}
        >
          Документи
        </div>
        <div
          className="cursor-pointer p-2 h-full hover:bg-white"
          onClick={() => {
            navigate("/notifications");
          }}
        >
          Известия {number}
        </div>
        <div className = "cursor-pointer p-2 h-full hover:bg-white"
            onClick={() =>{
              navigate("/profile")
            }}>
            профил
        </div>
        <div className = "cursor-pointer p-2 h-full hover:bg-white"
            onClick={() =>{
              navigate("/registry")
            }}>
            регистър
        </div>
        <div className = "cursor-pointer p-2 h-full hover:bg-white"
            onClick={() =>{
              navigate("/createCorporation")
            }}>
            създай фирма
        </div>
      </div>
    </>
  );
}
export default NavBar;
