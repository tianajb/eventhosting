
"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";


// const fetchMealIdeas = async (ingredient) => {

//     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
//     const data = await response.json();
//     return data.meals;
// };

export default function rsvp(onGuestReply) {
    const [gName, setgName] = useState("");
    const [gEmail, setgEmail] = useState("");
    const [gAttend, setgAttend] = useState("Yes");
    const [gQty, setgQty] = useState(1);

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    //setgFName(user.displayName);
    //setgEmail(user.email);

    const [quantity, setQuantity] = useState(1);

    //!!!!!!!!!!!!!!!!!!!DUMMY DATA!!!!!!!!!!!!!!!!!!!!!!!!!!
    const eName = "Jia's Birthday Bash";
    const eDate = "December 9, 2024";
    const eTime = "7:00 PM";
    const eVenue = "Jia's Crib";
    const eDetails = "the best party in the world! fjensd vbjlmrd s bvhxfg yujikfg hjkiuy tfvhjkiuyt gvbjmnbv cfghujk";
    //!!!!!!!!!!!!!!!!!!!DUMMY DATA!!!!!!!!!!!!!!!!!!!!!!!!!!

    function handleSubmit(event) {
        event.preventDefault();

        const guest_id = Math.random().toString(36);
        const guest = { id: guest_id, name: gName, email: gEmail, attendance: gAttend, qty: gQty };

        onGuestReply(guest);

        setName("");
        setQuantity(1);
        setCategory("produce");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="bg-stone-200 text-black p-5">
                    <div className="text-center text-slate-800">
                        <div className="px-4 py-2">
                            <label htmlFor="eName" className="text-3xl font-sans font-medium">{eName}</label><br></br>
                            <label htmlFor="eDetails" className="text-slate-800 italic"> {eDetails}</label><br></br>
                        </div>
                        <div>
                            <label htmlFor="eDate">{eDate} </label><br></br>
                            <label htmlFor="eTime">{eTime} </label><br></br>
                            <label htmlFor="eVenue">{eVenue} </label><br></br>
                        </div>


                    </div>
                    <div className="my-10">
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <td className="px-4 py-2">
                                        <label htmlFor="gName">Name:</label>
                                    </td>
                                    <td className="px-4 py-2">
                                        <input type="text" id="gName" value={user.displayName}
                                            onChange={(event) => setgName(event.target.value)}
                                            className="p-2 m-1 rounded-md w-52" required />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="px-4 py-2">
                                        <label htmlFor="gEmail">Email: </label>
                                    </td>
                                    <td className="px-4 py-2">
                                        <input type="text" id="gEmail" value={user.email}
                                            onChange={(event) => setgEmail(event.target.value)}
                                            className="p-2 m-1 rounded-md w-80" required />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">
                                        <label htmlFor="gAttend">Will attend? </label>
                                    </td>
                                    <td className="px-4 py-2">
                                        <select id="gAttend" value={gAttend}
                                            onChange={(event) => setgAttend(event.target.value)}
                                            className="p-2 m-1 rounded-md  w-52 " >
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
                                            className="p-2 m-1 rounded-md w-52 text-left" />
                                    </td>
                                </tr>

                            </thead>
                        </table>
                    </div>

                    <div className="flex items-center justify-center">
                        <button type="submit"
                            className="bg-emerald-700 hover:bg-emerald-500 hover: font-bold  
                        size-10 m-1 rounded-md w-11/12 text-white">OK
                        </button>
                    </div>
                </div>
            </form >

        </div >
    );
}