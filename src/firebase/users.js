import { db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Creating User Profile While signup
export const createUserProfile = async ( uid, data ) =>{
    const ref = doc(db, "users", uid);
    await setDoc(ref, {
        ...data,
        createdAt: serverTimestamp(),
    });

    return true;
}

export const getUserProfile = async (uid) =>{
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if(!snap.exists()) return null;
    return snap.data();
};
