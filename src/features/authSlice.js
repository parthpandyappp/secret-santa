import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    collection
} from "firebase/firestore";

import { app } from "../firebase";

const initialState = {
    bufferData: null,
    authUser: null,
    authUserLoading: false,
}

const auth = getAuth(app);
const db = getFirestore(app);

export const signInWithGoogle = createAsyncThunk('authentication/signinwithgoogle', async (thunkAPI) => {
    try {
        console.log("MAIN EXEC")
        const googleProvider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, googleProvider);
        return res.user;
    } catch (err) {
        console.error(err);
        alert(err.message);
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
                state.authUser = action.payload
                state.authUserLoading = false
            })
            .addCase(signInWithGoogle.pending, (state) => {
                console.log("EXEC PENDING")
                state.authUserLoading = true;
            })
    }
})
export const { userLogout } = authSlice.actions;
const authReducer = authSlice.reducer
export { authReducer }