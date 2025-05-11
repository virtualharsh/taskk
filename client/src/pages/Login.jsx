import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ModeToggle from "@/components/mode-toggle"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { toast } from 'sonner';
import axios from 'axios'
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate(); // to redirect after login
    const { setIsAuthenticated } = useAuth();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // If verified, attempt login
            const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            },{withCredentials:true});
            toast.success(loginRes.data.message);            
            setIsAuthenticated(true);
            navigate("/home"); // or your landing page

        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };

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
                        Login
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Email or Username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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

                                <div className="flex justify-end mb-4">
                                    <Link to="/NotFound"
                                        variant="outline"
                                        className="cursor-pointer hover:underline text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                    >
                                        Forgot Password?

                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    className='w-full'
                                >
                                    Login
                                </Button>


                                <div className="text-center text-sm text-gray-700 dark:text-gray-300 mt-2">
                                    Don’t have an account?{" "}
                                    <Link to="/signup" className="underline text-black dark:text-white font-medium hover:text-gray-900 dark:hover:text-gray-100">
                                        Sign up
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

export default Login