"use client"
import { useState } from "react";


export default function GuestList({ guests }) {

    var totalGuests = 0;

    //count total guests

    if (guests && Array.isArray(guests) && guests.length > 0) {
        totalGuests = 0;
        console.log("guestlists: ", guests);
        guests.map((guest) => {
            console.log("guest qty: ", totalGuests, "+=", guest.qty);
            if (guest.attendance === "Yes") {
                totalGuests += parseInt(guest.qty, 10); // Force guest.qty to be an integer
            }
        });
    }


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
                    <div>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guests && Array.isArray(guests) && guests.map((guest) => (
                                    guest.attendance === "Yes" ? (
                                        <tr key={guest.id}>
                                            <td className="px-4 py-2 w-48">{guest.name}</td>
                                            <td className="px-4 py-2">{guest.qty} guest/s</td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>




        </main >

    );

}


