import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Admin from "./components/Admin";
import LogIn from "./components/LogIn";
import Documents from "./components/Documents";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile"
import Registry from "./components/Registry";
import SuperAdmin from "./components/superAdmin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <Routes>
      <Route path = "/" element = {<App />} />
      <Route path = "/admin" element = {<Admin />} />
      <Route path = "/logIn" element = {<LogIn />} />
      <Route path = "/documents" element = {<Documents />} />
      <Route path = "/notifications" element = {<Notifications/>}/>
      <Route path = "/profile/:id" element = {<Profile/>}/>
      <Route path = "/registry" element = {<Registry/>}/>
      <Route path = "/createCorporation" element = {<SuperAdmin/>}/>
    </Routes>
  </Router>
);
