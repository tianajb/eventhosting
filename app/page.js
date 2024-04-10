import Link from "next/link";

export default function Page() {
    return (
        <main>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl">CPRG 306: Web Development 2 - Project</h1>
                <br></br>
                <p className="text-xl bg-slate-600 hover:bg-emerald-50 hover:text-slate-950 p-2">
                    <Link href="main">Event Hosting CA</Link></p>
            </div>

        </main >
    );
}