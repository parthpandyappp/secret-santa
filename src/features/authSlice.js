import { app } from "../firebase";
import { doesExist, getUser } from "../helper-functions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const initialState = {
    bufferData: null,
    authUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isLoggedIn: localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : false,
}


const auth = getAuth(app);
const db = getFirestore(app);

export const signInWithGoogle = createAsyncThunk('authentication/signinwithgoogle', async (thunkAPI) => {
    try {
        const googleProvider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, googleProvider);
        return res.user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
})

export const saveUserAndValidateExistence = createAsyncThunk('authentication/saveuserandvalidateexistence', async ({ bufferData }, thunkAPI) => {
    const userExist = await doesExist(bufferData)
    if (!userExist) {
        const userRef = collection(db, "users");
        const userData = {
            uid: bufferData.uid,
            name: bufferData.displayName,
            authProvider: "google",
            email: bufferData.email,
            pic: bufferData.photoURL,
            hobbies: []
        }
        await setDoc(doc(userRef, bufferData.uid), userData);
        return userData;
    } else {
        return await getUser(bufferData.uid);
    }
})



const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        userLogout: (state) => {
            state.authUser = null;
            state.isLoggedIn = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
                console.log(action.payload)
                state.bufferData = action.payload
            })
            .addCase(signInWithGoogle.pending, (state) => {
                console.log("EXEC PENDING")
                state.isLoggedIn = false;
            })
            .addCase(saveUserAndValidateExistence.pending, (state) => {
                state.isLoggedIn = true;
            })
            .addCase(saveUserAndValidateExistence.fulfilled, (state, action) => {
                console.log("PAYLOAD: ", action.payload)
                state.authUser = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload))
                state.isLoggedIn = true
            })
    }
})

export const { userLogout } = authSlice.actions;
const authReducer = authSlice.reducer
export { authReducer }