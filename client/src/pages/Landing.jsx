import React from "react";
import { SquareCheckBig, Sun, Moon, LogIn, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import ModeToggle from '@/components/mode-toggle'

const Landing = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="min-h-screen w-full relative bg-white dark:bg-black text-black dark:text-white">
            {/* Background grid effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#736b6b2e_1px,transparent_1px),linear-gradient(to_bottom,#736b6b2e_1px,transparent_1px)] bg-[size:24px_24px] mask-radial-custom" />

            {/* Navbar */}
            <nav className="fixed h-20 w-full z-10 flex items-center justify-around">
                {/* Left - Logo */}
                <div className="flex items-center gap-2 font-semibold">
                    <SquareCheckBig size={24} />
                    <span className="text-2xl">Taskk</span>
                </div>

                {/* Right - Theme icon and Login */}
                <div className="flex items-center gap-2 md:gap-4">
                    <ModeToggle className="cursor-pointer" /> {/* No background for ModeToggle */}

                    <Link className="text-2xl" to="/Signup">
                        <Button className="cursor-pointer">
                            <SmilePlus />
                            Signup
                        </Button>
                    </Link>

                    <Link className="text-2xl" to="/login">
                        <Button className="cursor-pointer">
                            <LogIn />
                            Login
                        </Button>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Landing;