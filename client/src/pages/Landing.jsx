import Cookies from 'js-cookie';
import { SquareCheckBig, LogIn, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import ModeToggle from '@/components/mode-toggle';
import { useEffect, useRef, useState } from "react";
import RotatingText from '../components/RotatingText';

const Landing = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const secondSectionRef = useRef(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('authToken')) || null
        if (token) {
            localStorage.removeItem('authToken')
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const isMobile = window.matchMedia("(max-width: 767px)").matches;


        let points = [];
        let POINTS_COUNT = 30;
        let MAX_DISTANCE = 90;

        if (isMobile) {
            POINTS_COUNT = 20;
            MAX_DISTANCE = 50;
        }

        for (let i = 0; i < POINTS_COUNT; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = theme === "dark" ? "#000" : "#fff";
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < POINTS_COUNT; i++) {
                let p1 = points[i];
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = theme === "dark" ? "#ccc" : "#111";
                ctx.fill();

                for (let j = i + 1; j < POINTS_COUNT; j++) {
                    let p2 = points[j];
                    let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < MAX_DISTANCE) {
                        ctx.strokeStyle = theme === "dark"
                            ? "rgba(255,255,255,0.25)"
                            : "rgba(0,0,0,0.2)";
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                p1.x += p1.vx;
                p1.y += p1.vy;
                if (p1.x < 0 || p1.x > width) p1.vx *= -1;
                if (p1.y < 0 || p1.y > height) p1.vy *= -1;
            }
            // Draw centered text
            ctx.fillStyle = theme === "dark" ? "#fff" : "#000";
            ctx.font = isMobile ? "bold 16px Arial" : "bold 24px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Get your task in order", width / 2, height / 2);

            animationRef = requestAnimationFrame(draw);
        };

        let animationRef = requestAnimationFrame(draw);

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationRef);
        };
    }, [theme]);


    return (
        <>

            <div className="min-h-screen w-full relative bg-white dark:bg-black text-black dark:text-white overflow-hidden">
                {/* Background grid effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#736b6b2e_1px,transparent_1px),linear-gradient(to_bottom,#736b6b2e_1px,transparent_1px)] bg-[size:24px_24px] mask-radial-custom pointer-events-none opacity-60 dark:opacity-100" />

                {/* Canvas Animation */}


                {/* Navbar */}
                <nav
                    className={`fixed top-0 h-20 w-full z-50 flex items-center justify-around px-4 md:px-10 transition-all duration-300
                    ${scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-gray-200 dark:border-zinc-800' : 'bg-transparent'}`}>
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
                            <Button variant="outline" size="lg" className="border-black text-black dark:bg-black dark:text-white dark:border-white hover:bg-gray-100 dark:hover:bg-zinc-900 w-48">Explore</Button>
                        </Link>
                    </div>
                </section>

                {/* Canvas + Text Section (Decorative Card) */}
                <section ref={secondSectionRef} className="w-full px-8 md:px-32 lg:px-30 py-12 md:py-24 flex flex-col md:flex-row items-center gap-10 md:gap-20 max-w-7xl mx-auto">
                    {/* Canvas Card */}
                    <div className="flex-1 md:block p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-300 dark:border-zinc-700">
                        <canvas
                            ref={canvasRef}
                            className="w-full h-64 md:h-100 rounded-lg"
                        />
                    </div>

                </section>


            </div>
        </>
    );
};

export default Landing;
