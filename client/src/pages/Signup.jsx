import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ModeToggle from "@/components/mode-toggle"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [emailError, setEmailError] = useState("")

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        
        if (value && !validateEmail(value)) {
            setEmailError("Please enter a valid email address")
        } else {
            setEmailError("")
        }
    }

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value
        setConfirmPassword(value)
        setPasswordsMatch(password === value || value === "")
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        setPasswordsMatch(confirmPassword === value || confirmPassword === "")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address")
            return
        }
        
        if (password !== confirmPassword) {
            setPasswordsMatch(false)
            return
        }
        
        // Process form submission here
        console.log("Form submitted:", { email, password })
    }

    return (
        <div className="min-h-screen w-full relative bg-white dark:bg-black text-black dark:text-white transition-colors">

            {/* Grid background effect */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#736b6b2e_1px,transparent_1px),linear-gradient(to_bottom,#736b6b2e_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Centered Card */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <Card className="w-full max-w-md p-6 relative shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">

                    {/* Theme Toggle Button with background */}
                    <div className="absolute top-2 right-2">
                        <ModeToggle className="cursor-pointer" />
                    </div>

                    <CardHeader className="text-center text-2xl font-bold">
                        Sign up
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className={`focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 ${
                                            emailError ? "border-red-500 focus:border-red-500" : ""
                                        }`}
                                        required
                                    />
                                    {emailError && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {emailError}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none pr-10 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        className={`focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none pr-10 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 ${
                                            !passwordsMatch && confirmPassword
                                                ? "border-red-500 focus:border-red-500"
                                                : ""
                                        }`}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                
                                {!passwordsMatch && confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        Passwords do not match
                                    </p>
                                )}

                                <div className="flex items-center justify-between">
                                    <Link to="/Login">
                                        <Badge
                                            variant="outline"
                                            className="cursor-pointer hover:underline text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                        >
                                            Already have an account? Login
                                        </Badge>
                                    </Link>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full cursor-pointer bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                                    disabled={!passwordsMatch || !password || !confirmPassword || !email || emailError}
                                >
                                    Sign up
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Signup;