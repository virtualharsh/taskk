import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ModeToggle from "@/components/mode-toggle"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [isEmailValid, setEmailValid] = useState(0);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordsMatch = password === confirmPassword;
    const isPasswordValid = password.length >= 6;


    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (newEmail.length <= 1) return setEmailValid(0);

        const isRegexValid = validateEmail();
        const isUnique = false;

        if (!isRegexValid && !isUnique) {
            setEmailValid(-1);
        } else {
            setEmailValid(1);
        }
    }

    const handleUsernameChange = (e) =>{
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // submit logic
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
                                            isEmailValid === -1
                                                ? 'focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 focus-visible:outline-none ring-1 ring-red-500'
                                                : isEmailValid === 1
                                                    ? 'focus-visible:ring-1 focus-visible:ring-green-500 focus-visible:border-green-500 focus-visible:outline-none ring-1 ring-green-500'
                                                    : 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]'
                                        }
                                    />
                                    {isEmailValid === -1 && (
                                        <div className="pt-1 pl-1 text-red-500">Invalid Email</div>
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
                                            isEmailValid === -1
                                                ? 'focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 focus-visible:outline-none ring-1 ring-red-500'
                                                : isEmailValid === 1
                                                    ? 'focus-visible:ring-1 focus-visible:ring-green-500 focus-visible:border-green-500 focus-visible:outline-none ring-1 ring-green-500'
                                                    : 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]'
                                        }
                                    />
                                    {isEmailValid === -1 && (
                                        <div className="pt-1 pl-1 text-red-500">Invalid Email</div>
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
