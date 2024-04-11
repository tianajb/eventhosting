
"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function Rsvp({ onGuestReply }) {

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const [gAttend, setgAttend] = useState("");
    const [gQty, setgQty] = useState(1);
    var gName = user.displayName;
    var gEmail = user.email;



    //!!!!!!!!!!!!!!!!!!!DUMMY DATA!!!!!!!!!!!!!!!!!!!!!!!!!
    const eName = "Jia's Birthday Bash";
    const eDate = new Date(2024, 11, 9);
    const eTime = "7:00 PM";
    const eVenue = "Jia's Crib";
    const eDetails = "We're excited to celebrate Jia's special day with you!";
    //!!!!!!!!!!!!!!!!!!!DUMMY DATA!!!!!!!!!!!!!!!!!!!!!!!!!!

    const currentDate = new Date();
    const formattedDate = eDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    function handleSubmit(event) {
        event.preventDefault();

        const guest_id = Math.random().toString(36);
        const guest = {
            id: guest_id, name: gName, email: gEmail, attendance: gAttend, qty: gQty
        };

        onGuestReply(guest);
    }

    return (
        <div>
            {/* start of rsvp form */}
            <form onSubmit={handleSubmit}>
                <div className="bg-stone-100 text-black p-10 m-5">
                    <div className="text-center text-slate-800">
                        <div className="px-4 py-2">
                            <div>
                                <label htmlFor="eName" className="text-3xl font-sans font-medium">{eName}</label>
                            </div>
                            <div>
                                <label htmlFor="eDetails" className="text-slate-800 italic"> {eDetails}</label></div>
                        </div>
                        <div>
                            <label htmlFor="eDate">{formattedDate} </label><br></br>
                            <label htmlFor="eTime">{eTime} </label><br></br>
                            <label htmlFor="eVenue">{eVenue} </label><br></br>
                        </div>


                    </div>

                    <div className="my-10">
                        {/* check  is invitation is still open */}
                        {eDate < currentDate ?
                            <div className="text-center text-slate-800 italic">
                                RSVP is closed
                            </div>
                            :
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <td className="px-4 py-2">
                                            <label htmlFor="gName">Name:</label>
                                        </td>
                                        <td className="px-4 py-2">
                                            <input type="text" id="gName" value={user.displayName}
                                                className="p-2 m-1 rounded-md w-80 bg-slate-100" required readOnly />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2">
                                            <label htmlFor="gEmail">Email: </label>
                                        </td>
                                        <td className="px-4 py-2">
                                            <input type="text" id="gEmail" value={user.email}
                                                className="p-2 m-1 rounded-md w-80  bg-slate-100" required readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">
                                            <label htmlFor="gAttend">Will attend? </label>
                                        </td>
                                        <td className="px-4 py-2">
                                            <select id="gAttend" value={gAttend}
                                                onChange={(event) => setgAttend(event.target.value)}
                                                className="p-2 m-1 rounded-md w-40" required>
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">
                                            <label htmlFor="gQty">No. of Seat/s:</label>
                                        </td>
                                        <td className="px-4 py-2 items-start">
                                            <input type="number" id="gQty"
                                                min="1" max="2" value={gQty}
                                                onChange={(event) => setgQty(event.target.value)}
                                                className="p-2 m-1 rounded-md w-40 text-left" />
                                        </td>
                                    </tr>

                                </thead>
                            </table>

                        }
                    </div>
                    {eDate > currentDate ?

                        <div className="flex items-center justify-center">
                            <button type="submit"
                                className="bg-emerald-700 hover:bg-emerald-500 hover: font-bold  
                        size-10 m-1 rounded-md w-11/12 text-white">OK
                            </button>
                        </div> : null
                    }


                </div>
            </form >

        </div >
    );
}