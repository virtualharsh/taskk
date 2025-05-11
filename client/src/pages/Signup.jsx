import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ModeToggle from "@/components/mode-toggle"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import axios from 'axios';
import { toast } from 'sonner';


const Signup = () => {
    const [email, setEmail] = useState("joshijayc075@gmail.com");
    const [username, setUsername] = useState("jay");

    const [isEmailValid, setEmailValid] = useState(true);
    const [emailExists, setEmailExists] = useState(false);

    const [usernameExists, setUsernameExists] = useState(false);

    const [password, setPassword] = useState("123123");
    const [confirmPassword, setConfirmPassword] = useState("123123");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const passwordsMatch = password === confirmPassword;
    const isPasswordValid = password.length >= 6;

    let debounceTimer;

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        const isRegexValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
        setEmailValid(isRegexValid);

        if (!isRegexValid) {
            setEmailExists(false);
            return;
        }

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/auth/check-email", { email: newEmail });
                setEmailExists(res.data.exists);
            } catch (err) {
                console.error("Error checking email:", err);
                setEmailExists(false);
            }
        }, 300);
    };

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/auth/check-username", { username: newUsername });
                setUsernameExists(res.data.exists);
            } catch (err) {
                console.error("Error checking email:", err);
                setUsernameExists(false);
            }
        }, 300);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO: Validation of all input fields before API call
            const res = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                password,
                username
            });
            toast.success(res.data.message + "; verification mail sent");
            navigate('/login');
        } catch (error) {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setUsername('')
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    }

    return (
        <div className="min-h-screen w-full relative bg-white dark:bg-black text-black dark:text-white transition-colors">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#736b6b2e_1px,transparent_1px),linear-gradient(to_bottom,#736b6b2e_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <Card className="w-full max-w-md px-6 py-8 sm:px-10 sm:py-10 relative shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                    <div className="absolute top-2 right-2">
                        <ModeToggle />
                    </div>

                    <CardHeader className="text-center text-2xl sm:text-3xl font-bold mb-4">
                        Sign up
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">

                                {/* Email Input */}
                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                        className={
                                            !isEmailValid || emailExists
                                                ? 'focus-visible:ring-1 ring-1 ring-red-500 border-red-500 focus-visible:border-red-500 focus-visible:outline-none'
                                                : ''
                                        }
                                    />
                                    {!isEmailValid && (
                                        <div className='text-xs text-red-500 mt-1'>Invalid Email</div>
                                    )}
                                    {emailExists && (
                                        <div className='text-xs text-red-500 mt-1'>Email already registered</div>
                                    )}
                                </div>

                                {/* Username Input */}
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        required
                                        className={
                                            usernameExists
                                                ? 'focus-visible:ring-1 ring-1 ring-red-500 border-red-500 focus-visible:border-red-500 focus-visible:outline-none'
                                                : ''
                                        }
                                        
                                    />
                                    {usernameExists && (
                                        <div className='text-xs text-red-500 mt-1'>Username exists</div>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                        className={`pr-10 ${password.length > 0 && !isPasswordValid
                                            ? 'focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 focus-visible:outline-none ring-1 ring-red-500'
                                            : password.length > 0
                                                ? 'focus-visible:ring-1 focus-visible:ring-green-500 focus-visible:border-green-500 focus-visible:outline-none ring-1 ring-green-500'
                                                : 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]'
                                            }`}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        tabIndex={-1}
                                        size="sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </Button>
                                </div>
                                {password.length > 0 && !isPasswordValid && (
                                    <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>
                                )}

                                {/* Confirm Password Input */}
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                        className={`pr-10 ${confirmPassword.length > 0 && !passwordsMatch
                                            ? 'focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 focus-visible:outline-none ring-1 ring-red-500'
                                            : confirmPassword.length > 0 && passwordsMatch
                                                ? 'focus-visible:ring-1 focus-visible:ring-green-500 focus-visible:border-green-500 focus-visible:outline-none ring-1 ring-green-500'
                                                : 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]'
                                            }`}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        tabIndex={-1}
                                        size="sm"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </Button>
                                </div>

                                {!passwordsMatch && confirmPassword && (
                                    <p className="text-red-500 text-xs">
                                        Passwords do not match
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    className="mt-4 w-full cursor-pointer bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                                >
                                    Sign up
                                </Button>

                                <div className="text-center text-sm text-gray-700 dark:text-gray-300 mt-2">
                                    Already have an account?{" "}
                                    <Link to="/login" className="underline text-black dark:text-white font-medium hover:text-gray-900 dark:hover:text-gray-100">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Signup
