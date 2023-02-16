import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={Login()}></Route>
      <Route exact path="/profile" element={Profile()}></Route>
    </Routes>
  );
}

export default App;
