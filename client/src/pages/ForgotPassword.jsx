import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

export default function ForgotPassword() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgot = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/auth/forgot-password`, { email });
            toast.success("Reset link sent! Check your email.");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="space-y-4" onSubmit={handleForgot}>
                <h2 className="text-2xl font-bold">Forgot Password</h2>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </Button>
            </form>
        </div>
    );
}
