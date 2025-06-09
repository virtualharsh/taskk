import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ModeToggle from "@/components/mode-toggle"


import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function ForgotPassword() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const handleForgot = async () => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/auth/forgot-password`, { email });
            toast.success("Reset link sent! Check your email.");
            setEmail("");
            navigate('/login')
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
            setOpenDialog(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-black text-black dark:text-white ">

            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#736b6b2e_1px,transparent_1px),linear-gradient(to_bottom,#736b6b2e_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Mode Toggle at top-right */}
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>

            <div className="w-full border border-gray-200 dark:border-gray-800 z-10 max-w-md p-6 bg-white dark:bg-black rounded-2xl shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
                <p className="text-sm text-muted-foreground text-center">
                    Enter your email address and we'll send you a reset link.
                </p>

                <div className="space-y-6">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                        <AlertDialogTrigger asChild>
                            <Button
                                type="button"
                                disabled={!email || loading}
                                className="w-full"
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Send reset link?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    We'll send a password reset link to <strong>{email}</strong>. Are you sure you want to proceed?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleForgot} disabled={loading}>
                                    {loading ? "Sending..." : "Yes, send it"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}
