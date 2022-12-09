import "./App.css";
import { useEffect } from "react";
import { Routes } from "./routes";
import { NavBar } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { saveUserAndValidateExistence } from "./features";


export default function App() {
  const { bufferData, isLoggedIn, authUser } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  console.log("INITIALS: ", isLoggedIn, bufferData)
  console.log("AUTH USER: ", authUser)

  useEffect(() => {
    if (bufferData) {
      dispatch(saveUserAndValidateExistence({ bufferData }))
    }
  }, [bufferData, dispatch])

  return (
    <div className="flex flex-col min-h-screen w-5/6 mx-auto p-2">
      <NavBar />
      <Routes />
    </div>
  );
}
