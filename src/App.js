import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ListEmployee from "./pages/ListEmployee";
import AddEmployee from "./pages/AddEmployee";
import ListRole from "./pages/ListRoles";
import AddRole from "./pages/AddRole";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={Login()}></Route>
      <Route exact path="/profile" element={Profile()}></Route>
      <Route exact path="/list/employee" element={ListEmployee()}></Route>
      <Route exact path="/list/role" element={ListRole()}></Route>
      <Route exact path="/add/employee" element={AddEmployee()}></Route>
      <Route exact path="/add/role" element={AddRole()}></Route>
    </Routes>
  );
}

export default App;
