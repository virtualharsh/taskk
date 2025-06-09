import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle"
import { toast } from "sonner";
import axios from "axios";

export default function ResetPassword() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/reset-password/${userId}`,
                { newPassword: password }
            );
            toast.success("Password reset successful!");
            navigate("/login");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white relative px-4">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#736b6b2e_1px,transparent_1px),linear-gradient(to_bottom,#736b6b2e_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Mode Toggle at top-right */}
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>

            <div className="w-full z-10 max-w-md p-6 border-gray-200 dark:border-gray-800 bg-white dark:bg-black border rounded-xl shadow-md space-y-6">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <p className="text-sm text-muted-foreground text-center">
                    Enter and confirm your new password to continue.
                </p>

                <form className="space-y-6" onSubmit={handleReset}>
                    <Input
                        type="password"
                        placeholder="New password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Confirm new password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
