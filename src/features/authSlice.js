import { app } from "../firebase";
import { doesExist, getUser } from "../helper-functions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const initialState = {
    bufferData: null,
    authUser: null,
    authUserLoading: false,
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
                state.authUserLoading = true;
            })
            .addCase(saveUserAndValidateExistence.pending, (state) => {
                state.authUserLoading = true;
            })
            .addCase(saveUserAndValidateExistence.fulfilled, (state, action) => {
                console.log("PAYLOAD: ", action.payload)
                state.authUser = action.payload;
                state.authUserLoading = false;
            })
    }
})

export const { userLogout } = authSlice.actions;
const authReducer = authSlice.reducer
export { authReducer }