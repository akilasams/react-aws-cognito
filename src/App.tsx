import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Account } from "./utilities/Account";

import "./style/css/style.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <Account>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Account>
  );
}

export default App;
