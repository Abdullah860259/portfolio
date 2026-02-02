import { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        setSubmitted(true)
        e.preventDefault();
        if (!email) return toast.error("Fill the Email Properly");
        if (!email.endsWith("@gmail.com")) return toast.error("Your mail should end with @gmail.com");
        const res = await fetch(import.meta.env.VITE_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await res.json();
        toast.success(data.message);
        setSubmitted(false);
        setEmail("");
    };

    return (
        <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Subscribe to newsletter</p>
            <form onSubmit={handleSubmit} className="mt-6">
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        disabled={submitted}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                </div>
                <button type="submit" className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700">
                    Subscribe
                </button>
            </form>
        </div>
    );
}
