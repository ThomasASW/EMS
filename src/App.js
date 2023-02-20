import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import List from "./pages/List";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={Login()}></Route>
      <Route exact path="/profile" element={Profile()}></Route>
      <Route exact path="/list" element={List()}></Route>
    </Routes>
  );
}

export default App;
