import { Routes, Route } from "react-router-dom";
import { Dashboard, Home } from "../pages";

function EndPoints() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="*" element={<Notfound />} /> */}
    </Routes>
  );
}

export { EndPoints as Routes };
