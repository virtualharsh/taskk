import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

export default function ResetPassword() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password/${userId}`, { 
                newPassword: password 
            });
            toast.success("Password reset successful!");
            navigate("/login");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="space-y-4" onSubmit={handleReset}>
                <h2 className="text-2xl font-bold">Reset Password</h2>
                <Input
                    type="password"
                    placeholder="New password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>
            </form>
        </div>
    );
}