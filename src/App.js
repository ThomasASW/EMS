import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ListEmployee from "./pages/ListEmployee";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={Login()}></Route>
      <Route exact path="/profile" element={Profile()}></Route>
      <Route exact path="/list/employee" element={ListEmployee()}></Route>
      <Route exact path="/add/employee" element={AddEmployee()}></Route>
    </Routes>
  );
}

export default App;
