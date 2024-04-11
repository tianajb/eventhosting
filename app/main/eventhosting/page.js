"use client";
import RSVPPage from "./rsvp";

import { useEffect, useState } from "react";

import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

import { getGuests, addGuest, updateGuest } from "../_services/eventhosting-service";
import GuestList from "./guestlist";

export default function Page() {
   const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

   const [guests, setGuests] = useState([]);


   const handleGuestReply = (guest) => {

      // Check if the guest is already in the list
      if (guests.some(g => g.email === guest.email)) {
         updateGuest(user.uid, guest.email, guest);
         try {
            setGuests(prevGuests => prevGuests.map(g => g.email === guest.email ? guest : g));
            alert("Response updated successfully")
         }
         catch (error) {
            console.error("Error updating response: ", error);
         }
      }
      // If the guest is not in the list, add the guest
      else {
         addGuest(user.uid, guest);
         try {
            if (guests.length > 0) {
               setGuests(prevGuests => [...prevGuests, guest]);
            }
            alert("Response sent successfully")
         }
         catch (error) {
            console.error("Error adding guest/s: ", error);
         }
      }

   };

   useEffect(() => {
      if (user) {
         loadGuests();
      }
   }, [user, setGuests]);


   const loadGuests = async () => {
      try {
         const guests = await getGuests(user.uid);
         setGuests(guests);
         console.log("Guests: ", guests);
      }
      catch (error) {
         console.error("Error loading guest/s: ", error);
      }
   };


   return (
      <main className="m-4" >
         {user ? (
            <div className="flex flex-row">
               <div className="my-3 mx-3 flex w-auto border-solid border-2 bg-stone-200">
                  <RSVPPage onGuestReply={handleGuestReply} />
               </div>
               <div className="my-3 mx-3  bg-stone-200 text-black">
                  <GuestList guests={guests} />

               </div>
            </div >

         ) :
            (
               <div className="text-2xl">
                  <p>You are not signed in</p>
                  <p>Click <strong><Link href="./">here</Link></strong> to sign in</p>

               </div>
            )
         }
      </main >
   )
}