"use client";
import { useEffect, useState } from "react";

import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import RSVPPage from "./rsvp";

//import MPage from "./page";
import { getGuests, addGuest } from "../_services/eventhosting-service";


export default function Page() {
   const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

   const [guests, setGuests] = useState([]);

   const handleGuestReply = (guest) => {
      addGuest(user.uid, guest);
      setGuests([...guests, guest]);

      console.log("Guests: ", guests);
   };

   useEffect(() => {
      if (user) {
         loadGuests();
      }
   }, [user]);

   const loadGuests = async () => {
      try {
         const guests = await getGuests(user.uid);
         setGuests(guests);
      }
      catch (error) {
         console.error("Error adding guest/s: ", error);
      }
   };


   return (
      <main className="m-4" >
         {user ? (
            <div>
               <div className="my-3 flex w-auto border-solid border-2">
                  <RSVPPage onGuestReply={handleGuestReply} />
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