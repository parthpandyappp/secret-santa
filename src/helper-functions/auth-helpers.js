import {
    getFirestore,
    getDocs,
    getDoc,
    doc,
    collection
} from "firebase/firestore";

import { app } from "../firebase";


const db = getFirestore(app);

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
        console.log("check user existence: ", data.find((user) => user.uid === currentUser.uid))
        return data.find((user) => user.uid === currentUser.uid);
    } catch (error) {
        console.log(error);
    }
};

const getUser = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data()
    } catch (error) {
        console.log(error);
    }
};

export { doesExist, getUser }