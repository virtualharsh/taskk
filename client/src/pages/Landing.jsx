import Cookies from 'js-cookie';
import { SquareCheckBig, LogIn, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import ModeToggle from '@/components/mode-toggle';
import { useEffect } from "react";
import RotatingText from '../components/RotatingText';

const Landing = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('authToken') || null;
        if (token) navigate('/home');
    }, []);

    return (
        <div className="min-h-screen w-full relative bg-white dark:bg-black text-black dark:text-white overflow-hidden">
            {/* Background grid effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#736b6b2e_1px,transparent_1px),linear-gradient(to_bottom,#736b6b2e_1px,transparent_1px)] bg-[size:24px_24px] mask-radial-custom pointer-events-none opacity-60 dark:opacity-100" />

            {/* Navbar */}
            <nav className="fixed top-0 h-20 w-full z-20 flex items-center justify-around">
                <div className="flex items-center gap-2 font-semibold text-xl md:text-2xl">
                    <SquareCheckBig size={24} />
                    <span>Taskk</span>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <ModeToggle className="cursor-pointer" />

                    <Link to="/signup">
                        <Button>
                            <SmilePlus className="mr-2" />
                            Signup
                        </Button>
                    </Link>

                    <Link to="/login">
                        <Button
                            variant="outline"
                            className="border-black text-black dark:text-white dark:border-white hover:bg-gray-100 dark:hover:bg-zinc-900"
                        >
                            <LogIn className="mr-2" />
                            Login
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col justify-center items-center text-center px-6 md:px-10 pt-24 min-h-[calc(100vh-5rem)] relative z-10">
                <RotatingText
                    texts={['Write', 'Collaborate', 'Take Notes', 'Grow !']}
                    mainClassName="text-5xl md:text-7xl font-bold text-black dark:text-white px-4 py-2 rounded-lg  dark:from-cyan-600 dark:to-blue-800"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-1"
                    transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                    rotationInterval={3000}
                />

                <p className="mt-6 text-xl font-stretch-semi-expanded md:text-2xl max-w-3xl text-gray-700 dark:text-gray-300">
                    <span className='text-black dark:text-white underline underline-offset-2'>Taskk</span> helps you organize your tasks, take structured notes, and boost your productivity with an elegant, distraction-free workspace.
                </p>

                <div className="mt-8 flex flex-col gap-3 md:flex-row">
                    <Link to="/signup">
                        <Button size="lg" className="w-48">Get Started</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline" size="lg" className="border-black text-black dark:text-white dark:border-white hover:bg-gray-100 dark:hover:bg-zinc-900 w-48">Explore</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Landing;
