import { useEffect } from "react";
import { Routes } from "./routes";
import { useSelector, useDispatch } from "react-redux";
import { signInWithGoogle, saveUserAndValidateExistence } from "./features";


export default function App() {
  const { bufferData, authUserLoading, authUser } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  console.log("INITIALS: ", authUserLoading, bufferData)
  console.log("AUTH USER: ", authUser)

  useEffect(() => {
    if (bufferData) {
      dispatch(saveUserAndValidateExistence({ bufferData }))
    }
  }, [bufferData, dispatch])

  return (
    <div className="App">
      <button
        onClick={() => dispatch(signInWithGoogle())}
      >
        Sign in with Google
      </button>
      <Routes />
    </div>
  );
}
