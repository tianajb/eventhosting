export default function Guest({ name, attendance, qty }) {
    console.log("Guest: ", name, attendance, qty);
    return (
        <section className="w-80">
            {attendance === "Yes" ? <div className="text-black">

                <td className="px-4 py-2 w-48">
                    {name}
                </td>
                <td className="px-4 py-2">
                    {qty} guest/s
                </td>
            </div>

                : null}
        </section>
    );
}
