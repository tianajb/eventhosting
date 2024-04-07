"use client";
import NewItem from "./new-item";
import ItemList from "./item-list";
import { useEffect, useState } from "react";
import MealIDeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import RSVPPage from "./rsvp";

//import MPage from "./page";
import { getItems, addItem } from "../_services/shopping-list-service";


export default function Page() {
   const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

   const [items, setItems] = useState([]);
   const handleAddItem = (item) => {
      addItem(user.uid, item);
      setItems([...items, item]);
   };
   const [selectedItemName, setSelectedItemName] = useState("");
   const handleItemSelect = (selectedItem) => {

      setSelectedItemName(selectedItem.split(",")[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD10-\uDDFF])|/g, ''));
   };

   const [guests, setGuests] = useState([]);
   const handleGuestReply = (guest) => {
      //(user.uid, guest);
      setGuests([...guests, guest]);
   };


   // const handleAddItem = (item) => {
   //    addItem(user.uid, item);
   //    setItems([...items, item]);
   // };

   useEffect(() => {
      if (user) {
         loadItems();
      }
   }, [user]);

   const loadItems = async () => {
      try {
         const items = await getItems(user.uid);
         setItems(items);
      }
      catch (error) {
         console.error("Error adding item: ", error);
      }
   };

   return (
      <main className="m-4" >
         {user ? (
            <div>
               <div className="my-3 flex w-auto border-solid border-2">

                  <RSVPPage onGuestReply={handleGuestReply} />
                  {/* <NewItem onAddItem={handleAddItem} />
                     <ItemList items={items} onItemSelect={handleItemSelect} /> */}

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