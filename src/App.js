import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ListEmployee from "./pages/ListEmployee";
import AddEmployee from "./pages/AddEmployee";
import ListRole from "./pages/ListRoles";
import AddRole from "./pages/AddRole";
import EditRole from "./pages/EditRole";
import EditEmployee from "./pages/EditEmployee";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NotifyModal from "./components/NotifyModal";
import { useSelector } from "react-redux";
import { Notification } from "./AppSlice";
import ConfirmModal from "./components/ConfirmModal";
import ProtectedRoutes from "./app/ProtectedRoutes";

function App() {
  const location = useLocation();
  const notify = useSelector(Notification);

  return (
    <>
      <ConfirmModal modalDetails={notify} />
      <NotifyModal modalDetails={notify} />
      {location.pathname === "/login" ? <></> : <Header />}
      <Routes>
        <Route index element={<Navigate to={"/login"} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/list/employee" element={<ListEmployee />}></Route>
          <Route path="/add/employee" element={<AddEmployee />}></Route>
          <Route path="/edit/employee/:id" element={<EditEmployee />}></Route>
          <Route path="/list/role" element={<ListRole />}></Route>
          <Route path="/add/role" element={<AddRole />}></Route>
          <Route path="/edit/role/:id" element={<EditRole />}></Route>
        </Route>
      </Routes>
      {location.pathname === "/login" ? <></> : <Footer />}
    </>
  );
}

export default App;
