import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Home,
  MyGroups,
  CreateGroup,
  JoinGroup,
  AdditionalInfo,
  Notfound,
} from "../pages";

function EndPoints() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/explore" element={<MyGroups />} />
      <Route path="/create" element={<CreateGroup />} />
      <Route path="/join" element={<JoinGroup />} />
      <Route path="/info" element={<AdditionalInfo />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export { EndPoints as Routes };
