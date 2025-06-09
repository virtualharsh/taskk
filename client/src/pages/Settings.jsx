import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

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

const Settings = () => {
    const SERVER = import.meta.env.VITE_SERVER;
    const navigate = useNavigate();
    const usernameFromParams = useParams().username;

    const localData = JSON.parse(localStorage.getItem("authToken"));
    const token = localData.token;

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [updatingPassword, setUpdatingPassword] = useState(false);

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handlePasswordChange = async () => {
        setUpdatingPassword(true);

        try {
            await axios.put(
                `${SERVER}/user/changepassword`,
                {
                    oldPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Password updated");
            setOldPassword("");
            setNewPassword("");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to change password");
        } finally {
            setUpdatingPassword(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        toast.success("Logged out");
        navigate("/login");
    };

    return (
        <div className="p-3 mt-10 md:p-0 md:py-2 md:mt-0">
            <div className="hidden md:flex">
                <h1 className="text-xl mb-4 text-zinc-500">Settings</h1>
            </div>

            {/* Password Change */}
            <div className="flex flex-col gap-3 px-6 py-6 md:px-10 max-w-3xl md:mx-auto">
                <h2 className="text-lg font-semibold">Security</h2>
                <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                        <h3 className="font-medium">Change Password</h3>
                        <p className="text-sm text-muted-foreground">Keep your account secure</p>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="mt-4 md:mt-0">
                                Change Password
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Change your password</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Enter your current and new password.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <div className="space-y-3">
                                {/* Old Password Field */}
                                <div className="relative">
                                    <Input
                                        type={showOldPassword ? "text" : "password"}
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        placeholder="Current password"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                    >
                                        {showOldPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>

                                {/* New Password Field */}
                                <div className="relative">
                                    <Input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New password"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handlePasswordChange}
                                    disabled={updatingPassword}
                                >
                                    {updatingPassword ? "Updating..." : "Update"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {/* Logout */}
            <div className="flex flex-col gap-3 px-6 py-6 md:px-10 max-w-3xl md:mx-auto">
                <h2 className="text-lg font-semibold">Session</h2>
                <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h3 className="font-medium">Logout from your account</h3>
                        <p className="text-sm text-muted-foreground">
                            End current session and redirect you to the login page.
                        </p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="mt-4 md:mt-0">
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
