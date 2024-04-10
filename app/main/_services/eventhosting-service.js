import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";
import { useEffect } from "react";

export const getGuests = async (userId) => {
    try {
        const guests = [];
        const q = query(collection(db, `users/${userId}/guests`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            guests.push({ id: doc.id, ...doc.data() });
        });
        return guests;
    }
    catch (error) {
        console.error("Error getting guests: ", error);
    }
};

export const addGuest = async (userId, guest) => {
    try {
        const docRef = await addDoc(collection(db, `users/${userId}/guests`), guest);
        return docRef.id;
    }
    catch (error) {
        console.error("Error adding guest: ", error);
    }
};