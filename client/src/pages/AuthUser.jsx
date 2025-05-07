import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ModeToggle from "@/components/mode-toggle"
import { Link } from "react-router-dom"
import { ArrowRight, Check } from "lucide-react"

const AuthUser = () => {
    const [username, setUsername] = useState("")
    const [otp, setOtp] = useState("")
    const [showOtpField, setShowOtpField] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [usernameError, setUsernameError] = useState("")

    const validateUsername = (username) => {
        // Basic validation - username should be at least 3 characters
        return username.length >= 3
    }

    const handleUsernameChange = (e) => {
        const value = e.target.value
        setUsername(value)

        if (value && !validateUsername(value)) {
            setUsernameError("Username must be at least 3 characters")
        } else {
            setUsernameError("")
        }
    }

    const handleGetOtp = () => {
        if (!validateUsername(username)) {
            setUsernameError("Please enter a valid username")
            return
        }

        // Simulate OTP being sent
        console.log("OTP requested for username:", username)
        setShowOtpField(true)
        setOtpSent(true)
        
        // In a real app, you would call an API to generate and send OTP
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateUsername(username)) {
            setUsernameError("Please enter a valid username")
            return
        }

        if (!otp) {
            return
        }

        // In a real app, you would verify the OTP with your backend
        console.log("Authentication form submitted:", { username, otp })
    }

    return (
        <div className="min-h-screen w-full relative bg-white dark:bg-black text-black dark:text-white transition-colors">
            {/* Grid background effect */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#736b6b2e_1px,transparent_1px),linear-gradient(to_bottom,#736b6b2e_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Centered Card */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <Card className="w-full max-w-md px-6 py-8 sm:px-10 sm:py-10 relative shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                    {/* Theme Toggle */}
                    <div className="absolute top-2 right-2">
                        <ModeToggle />
                    </div>

                    <CardHeader className="text-center text-2xl sm:text-3xl font-bold mb-4">
                        Authenticate User
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex space-x-2">
                                        <Input
                                            type="text"
                                            placeholder="Select Username"
                                            value={username}
                                            onChange={handleUsernameChange}
                                            className={`focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 ${usernameError ? "border-red-500 focus:border-red-500" : ""}`}
                                            disabled={otpSent}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            onClick={handleGetOtp}
                                            disabled={!username || usernameError || otpSent}
                                            className="whitespace-nowrap cursor-pointer bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                                        >
                                            {otpSent ? (
                                                <>
                                                    <Check className="h-4 w-4 mr-1" /> Sent
                                                </>
                                            ) : (
                                                "Get OTP"
                                            )}
                                        </Button>
                                    </div>
                                    {usernameError && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {usernameError}
                                        </p>
                                    )}
                                </div>

                                {showOtpField && (
                                    <div className="mt-4">
                                        <Input
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                                            required
                                        />
                                    </div>
                                )}

                                {showOtpField && (
                                    <Button
                                        type="submit"
                                        className="w-full cursor-pointer mt-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center justify-center"
                                        disabled={!otp}
                                    >
                                        Authenticate <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}

                                {/* <div className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
                                    Already registered?{" "}
                                    <Link to="/login" className="underline text-black dark:text-white font-medium hover:text-gray-900 dark:hover:text-gray-100">
                                        Login
                                    </Link>
                                </div> */}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AuthUser