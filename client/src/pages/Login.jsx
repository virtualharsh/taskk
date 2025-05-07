import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ModeToggle from "@/components/mode-toggle"
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="min-h-screen w-full relative bg-white dark:bg-black text-black dark:text-white transition-colors">

            {/* Grid background effect */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#736b6b2e_1px,transparent_1px),linear-gradient(to_bottom,#736b6b2e_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Centered Card */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <Card className="w-full max-w-md p-6 relative shadow-lg border">

                    {/* Theme Toggle Button with background */}
                    <div className="absolute top-2 right-2">
                        <ModeToggle className="cursor-pointer" /> {/* Background applied here */}
                    </div>

                    <CardHeader className="text-center text-2xl font-bold">
                        Login
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email or Username"
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none"
                        />

                        <div className="flex items-center justify-between">
                            <Link to="/NotFound">
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer hover:underline text-xs"
                                >
                                    Forgot Password?
                                </Badge>
                            </Link>
                        </div>

                        <Button className="w-full cursor-pointer">Login</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login;