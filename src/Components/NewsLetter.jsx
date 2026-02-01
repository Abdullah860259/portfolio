import { useState } from "react";
import { toast } from "sonner";


export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.endsWith("@gmail.com")) {
            toast.error("Your mail should ends with @gmail.com ")
            return;
        }
        if (!email) return toast.error("Fill the Email Properly");
        const res = await fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        })
        const data = await res.json();
        toast.success(data.message)
        setSubmitted(true);
        setEmail("");
    };

    return (
        <div class="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p class="text-sm font-semibold tracking-widest text-gray-400 uppercase">Subscribe to newsletter</p>

            <form action="#" method="POST" class="mt-6">
                <div>
                    <label for="email" class="sr-only">Email</label>
                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" id="email" placeholder="Enter your email" class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                </div>

                <button onClick={handleSubmit} class="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700">Subscribe</button>
            </form>
        </div>
    );
}
