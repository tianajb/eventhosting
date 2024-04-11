import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where, updateDoc } from "firebase/firestore";
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

// export const updateGuest = async (userId, guestEmail, updatedGuest) => {
//     try {
//         const guestsCollectionRef = collection(db, `users/${userId}/guests`);
//         const q = query(guestsCollectionRef, where("email", "==", guestEmail));
//         const querySnapshot = await getDocs(q);

//         querySnapshot.forEach((doc) => {
//             updateDoc(doc.ref, updatedGuest);
//         });

//         return "Guest updated successfully";
//     }
//     catch (error) {
//         console.error("Error updating guest: ", error);
//         return null;
//     }
// };
export const updateGuest = async (userId, guestEmail, updatedGuest) => {
    try {
        // Query the guest documents based on the guest email
        const querySnapshot = await getDocs(query(collection(db, `users/${userId}/guests`), where("email", "==", guestEmail)));

        // Check if there are matching guest documents
        if (!querySnapshot.empty) {
            // Get the reference to the first matching document
            const docRef = querySnapshot.docs[0].ref;
            // Update the first matching guest document with the new data
            await updateDoc(docRef, updatedGuest);
            return "Guest updated successfully";
        } else {
            // If no matching guest documents are found
            console.error("No matching guest found with email: ", guestEmail);
            return null;
        }
    }
    catch (error) {
        console.error("Error updating guest: ", error);
        return null;
    }
};