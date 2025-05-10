import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ModeToggle from "@/components/mode-toggle"
import { useNavigate, useLocation } from "react-router-dom"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const AuthUser = () => {
    const [username, setUsername] = useState("")
    const [otp, setOtp] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [otpToggle, setOtpToggle] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state === null) {
            navigate("/signup")
        }
    }, [])

    const { email, password } = location.state || {}

    const validateUsername = (username) => {
        return username.length >= 6
    }

    const handleUsernameChange = (e) => {
        const value = e.target.value
        setUsername(value)

        if (value && !validateUsername(value)) {
            setUsernameError("Username must be at least 6 characters")
        } else {
            setUsernameError("")
        }
    }

    const handleGenerateOTP = (e) => {
        setOtpToggle(true)

        if (!validateUsername(username)) {
            setUsernameError("Please enter a valid username")
            return
        }

        if (!otp) return

        // TODO:
        // insert the data into database with OTP
    }

    const handleSubmit = (e) =>{
        // TODO:
        // check OTP with database for given username and return TRUE OR FALSE

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
                        Select Username
                    </CardHeader>

                    <CardContent>
                        <form>
                            <div className="space-y-4">
                                <Input
                                    type="text"
                                    placeholder="Select Username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    disabled={otpToggle}
                                    className={`focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 ${usernameError ? "border-red-500 focus:border-red-500" : ""}`}
                                    required
                                />
                                {usernameError && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {usernameError}
                                    </p>
                                )}

                                {!otpToggle && (
                                    <Button
                                        className="w-full"
                                        disabled={!validateUsername(username)}
                                        onClick={handleGenerateOTP}
                                        type="button"
                                    >
                                        Generate OTP
                                    </Button>

                                )}

                                {otpToggle && (
                                    <div className="flex flex-col items-center w-full space-y-4">
                                        <div className="flex items-center justify-center gap-4 flex-wrap">
                                            <InputOTP maxLength={6} value={otp} onChange={setOtp} className="flex gap-2">
                                                <InputOTPGroup className="flex gap-2">
                                                    <InputOTPSlot index={0} className="w-10 h-12 text-lg text-center border rounded-md" />
                                                    <InputOTPSlot index={1} className="w-10 h-12 text-lg text-center border rounded-md" />
                                                    <InputOTPSlot index={2} className="w-10 h-12 text-lg text-center border rounded-md" />
                                                </InputOTPGroup>

                                                <InputOTPSeparator className="text-xl" />

                                                <InputOTPGroup className="flex gap-2">
                                                    <InputOTPSlot index={3} className="w-10 h-12 text-lg text-center border rounded-md" />
                                                    <InputOTPSlot index={4} className="w-10 h-12 text-lg text-center border rounded-md" />
                                                    <InputOTPSlot index={5} className="w-10 h-12 text-lg text-center border rounded-md" />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>

                                        <div className="flex justify-end w-full">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => console.log("Resend OTP")}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                Resend OTP
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                
                                {otpToggle && (
                                    <Button
                                        className="w-full"
                                        onClick={handleSubmit}
                                        type="button"
                                    >
                                        Submit
                                    </Button>

                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AuthUser
