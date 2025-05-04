import React from "react";
import { SquareCheckBig, Sun, LogIn, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="min-h-screen w-full bg-black text-white relative">
            {/* Background grid effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#2b2d2b2e_1px,transparent_1px),linear-gradient(to_bottom,#2b2d2b2e_1px,transparent_1px)] bg-[size:20px_20px] mask-radial-[ellipse_120%_70%_at_50%_0%] mask-from-black mask-from-80% mask-to-transparent mask-to-110%" />

            {/* Navbar */}
            <nav className="fixed h-20 w-full z-10 flex items-center justify-around">
                {/* Left - Logo */}
                <div className="flex items-center gap-2 font-semibold">
                    <SquareCheckBig size={24}/>
                    <span className="text-2xl">Task</span>
                </div>

                {/* Right - Theme icon and Login */}
                <div className="flex items-center gap-4">
                    <Sun size={20} />
                    <Link className="text-2xl" to='/Signup'><Button><SmilePlus />Signup</Button></Link>
                    <Link className="text-2xl" to='/login'><Button><LogIn/>Login</Button></Link>
                    
                </div>
            </nav>
        </div>
    );
};

export default Landing;
