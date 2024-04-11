"use client"
import Guest from "./guest";
import { useState } from "react";


export default function GuestList({ guests }) {

    var totalGuests = 0;

    guests.forEach(guest => {
        if (guest.attendance === "Yes") {
            totalGuests += guest.qty;
        }
    });

    return (
        <main className="m-4">

            <div className="bg-stone-200 text-black p-5">
                <div className="text-center text-slate-800">
                    <div className="px-4 py-2">
                        <div>
                            <label className="text-3xl font-sans font-medium">Guest list</label>
                        </div>
                        <div>
                            <label className="text-slate-800 italic"> See you there!</label>
                        </div>
                        <div className="py-4">
                            Total guests: {totalGuests}
                        </div>
                    </div>
                    <ul>
                        {guests.map((guest) => (
                            <li key={guest.id} className="w-80">
                                <Guest name={guest.name} attendance={guest.attendance} qty={guest.qty} />
                            </li>

                        ))}
                    </ul>
                </div>
            </div>



        </main >

    );

}


