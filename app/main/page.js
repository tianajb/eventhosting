"use client";
//import Link from "next/link";
import SPage from "./eventhosting/page";
// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";




export default function Page() {
    // Use the useUserAuth hook to get the user object and the login and logout functions
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    // Sign in to Firebase with GitHub authentication
    const signIn = async () => {
        await gitHubSignIn();

    };

    // Sign out of Firebase
    const signOut = async () => {
        await firebaseSignOut();
    };
    return (
        <div className="bg-slate-50 p-5">
            <div className=""><br></br>
                <h1 className="text-black text-3xl font-sans font-medium text-emerald-900">Event Hosting CA</h1>
            </div>

            {user ? (
                <div>

                    <div className="my-3 flex flex-row w-auto">
                        <div className="w-5/6">
                            <p className="text-black text-md">Hi, {user.displayName} ({user.email})</p>
                        </div>
                        <div className=""><button id="sign out"
                            onClick={() => signOut()}
                            className="bg-emerald-700 hover:bg-emerald-500
                                        size-10 w-32 m-1 rounded-md text-sm">Sign out</button>
                        </div>
                    </div>

                    <div className="self-center">
                        <SPage />
                    </div>
                </div>
            ) :
                (
                    <div className="my-3">
                        <p>Welcome, Please sign in</p>
                        <button id="sign in"
                            onClick={() => signIn()}
                            className="bg-emerald-700 hover:bg-emerald-500
                                        size-10 w-32 m-1 rounded-md">Sign in</button>
                    </div >
                )
            }
        </div >
    );
}