import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ListEmployee from "./pages/ListEmployee";
import AddEmployee from "./pages/AddEmployee";
import ListRole from "./pages/ListRoles";
import AddRole from "./pages/AddRole";
import DeleteRole from "./pages/DeleteRole";
import DeleteEmployee from "./pages/DeleteEmployee";
import EditRole from "./pages/EditRole";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to={"/login"} />}></Route>
      <Route exact path="/login" element={Login()}></Route>
      <Route exact path="/profile" element={Profile()}></Route>
      <Route exact path="/list/employee" element={ListEmployee()}></Route>
      <Route exact path="/add/employee" element={AddEmployee()}></Route>
      <Route exact path="/delete/employee" element={DeleteEmployee()}></Route>
      <Route exact path="/list/role" element={ListRole()}></Route>
      <Route exact path="/add/role" element={AddRole()}></Route>
      <Route exact path="/edit/role" element={EditRole()}></Route>
      <Route exact path="/delete/role" element={DeleteRole()}></Route>
    </Routes>
  );
}

export default App;
