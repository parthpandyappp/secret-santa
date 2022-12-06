import { useEffect, useState } from "react";

// importing routes
import { Routes } from "./routes";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  getDoc,
  where,
  doc,
  addDoc,
  setDoc,
  collection,
} from "firebase/firestore";

import { app } from "./firebase";

export default function App() {
  const [obtainedUser, setObtainedUser] = useState(null);
  const [finalUser, setFinalUser] = useState(null);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const signInWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      setObtainedUser(res.user);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const getUserDataFromFireStore = async () => {
    try {
      const res = await getDocs(collection(db, "users"));
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const doesExist = async (currentUser) => {
    try {
      const querySnapshot = await getUserDataFromFireStore();
      const data = querySnapshot.docs.map((snap) => snap.data());
      console.log(
        "check user existence: ",
        data.find((user) => user.uid === currentUser.uid)
      );
      return data.find((user) => user.uid === currentUser.uid);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (uid, setFinalUser) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      console.log("GOT USER", docSnap.exists());
      // if (docSnap.exists()) {
      setFinalUser(docSnap.data());
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (obtainedUser) {
        const userExist = await doesExist(obtainedUser);
        console.log(userExist);
        if (!userExist) {
          const userRef = collection(db, "users");
          await setDoc(doc(userRef, obtainedUser.uid), {
            uid: obtainedUser.uid,
            name: obtainedUser.displayName,
            authProvider: "google",
            email: obtainedUser.email,
            pic: obtainedUser.photoURL,
            hobbies: [],
          });
          setFinalUser({
            uid: obtainedUser.uid,
            name: obtainedUser.displayName,
            authProvider: "google",
            email: obtainedUser.email,
            pic: obtainedUser.photoURL,
            hobbies: [],
          });
        } else {
          await getUser(obtainedUser.uid, setFinalUser);
        }
      }
    })();
  }, [obtainedUser]);

  console.log(finalUser);

  return (
    <div className="App">
      <button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Sign in with Google
      </button>
      <Routes />
    </div>
  );
}
