import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RegisterAdmin" element={<Register isAdmin={true} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
