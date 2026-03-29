import Basic from "./components/pages/Basic";
import Advanced from "./components/pages/Advanced";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* Tabs (Navbar) */}
      <NavBar/>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Basic />} />
        <Route path="/advanced" element={<Advanced />} />
      </Routes>
    </div>
  );
}

export default App;
