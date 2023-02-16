import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={Login()}></Route>
    </Routes>
  );
}

export default App;
