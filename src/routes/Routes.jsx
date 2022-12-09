import { Routes, Route } from "react-router-dom";
import { Home, MyGroups, AdditionalInfo, Notfound } from "../pages";

function EndPoints() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<MyGroups />} />
      <Route path="/info" element={<AdditionalInfo />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export { EndPoints as Routes };
