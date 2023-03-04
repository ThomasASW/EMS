import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ListEmployee from "./pages/ListEmployee";
import AddEmployee from "./pages/AddEmployee";
import ListRole from "./pages/ListRoles";
import AddRole from "./pages/AddRole";
import DeleteRole from "./pages/DeleteRole";
import DeleteEmployee from "./pages/DeleteEmployee";
import EditRole from "./pages/EditRole";
import EditEmployee from "./pages/EditEmployee";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/login" ? <></> : <Header />}
      <Routes>
        <Route index element={<Navigate to={"/login"} />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/list/employee" element={<ListEmployee />}></Route>
        <Route exact path="/add/employee" element={<AddEmployee />}></Route>
        <Route path="/edit/employee/:id" element={<EditEmployee />}></Route>
        <Route
          exact
          path="/delete/employee/:id"
          element={<DeleteEmployee />}
        ></Route>
        <Route exact path="/list/role" element={<ListRole />}></Route>
        <Route exact path="/add/role" element={<AddRole />}></Route>
        <Route exact path="/edit/role/:id" element={<EditRole />}></Route>
        <Route exact path="/delete/role/:id" element={<DeleteRole />}></Route>
      </Routes>
      {location.pathname === "/login" ? <></> : <Footer />}
    </>
  );
}

export default App;
