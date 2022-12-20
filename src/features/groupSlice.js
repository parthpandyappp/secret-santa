import { app } from "../firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";


const initialState = {
    groups: [],
    recentGroupData: {},
    creationInProgress: false,
}

const db = getFirestore(app);

export const createSecretGroup = createAsyncThunk('groups/createsecretgroup', async ({ groupData }, thunkAPI) => {
    try {
        console.log(groupData)
        const { gid } = groupData;
        const groupRef = collection(db, "groups");

        await setDoc(doc(groupRef, gid), groupData);
        return groupData;
    } catch (error) {
        console.log(error)
    }
})



const groupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createSecretGroup.fulfilled, (state, action) => {
                console.log(action.payload)
                state.recentGroupData = action.payload
                state.groups = [...state.groups, action.payload]
                state.creationInProgress = true;
            })
            .addCase(createSecretGroup.pending, (state) => {
                console.log("EXEC PENDING")
                state.creationInProgress = false;
            })
    }
})

// export const { } = groupSlice.actions;
const groupReducer = groupSlice.reducer
export { groupReducer }