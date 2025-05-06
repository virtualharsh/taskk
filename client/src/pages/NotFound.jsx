import { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";

export default function NotFound() {
    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [glitchCycle, setGlitchCycle] = useState(0);
    const isDark = theme === "dark";

    useEffect(() => {
        // Entrance animation
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        // Continuous glitch effect
        const glitchInterval = setInterval(() => {
            setGlitchCycle(prev => (prev + 1) % 3); // Cycle between 0, 1, 2 states
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearInterval(glitchInterval);
        };
    }, []);

    // Dynamic glitch styling based on cycle
    const getGlitchStyles = () => {
        if (glitchCycle === 0) return "";

        if (glitchCycle === 1) {
            return isDark
                ? "after:content-['404'] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-90 after:transform after:-translate-x-1 after:translate-y-1 after:text-gray-900"
                : "after:content-['404'] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-80 after:transform after:-translate-x-1 after:translate-y-1 after:text-gray-200";
        }

        return isDark
            ? "before:content-['404'] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:opacity-90 before:transform before:translate-x-1 before:-translate-y-1 before:text-gray-900"
            : "before:content-['404'] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:opacity-80 before:transform before:translate-x-1 before:-translate-y-1 before:text-gray-200";
    };

    return (
        <div className={`flex min-h-screen flex-col items-center justify-center p-6 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
            <div className={`max-w-lg w-full transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0 transform translate-y-4"}`}>
                {/* Main card with theme toggle half out */}
                <div className="relative">
                    {/* Theme toggle positioned half outside the card */}
                    <div className="absolute -top-2 -right-2 z-10">
                        <ModeToggle />
                    </div>

                    <Card className={`overflow-hidden ${isDark ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
                        <CardHeader className="pt-16 pb-0">
                            {/* 404 Text with continuous glitch effect */}
                            <div className="text-center">
                                <h1
                                    className={`text-9xl font-bold tracking-tighter mb-2 relative`}
                                    style={{
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                        fontWeight: 800,
                                        letterSpacing: "-0.05em"
                                    }}
                                >
                                    <span className={`relative inline-block ${getGlitchStyles()}`}>
                                        404
                                    </span>
                                </h1>
                                <div className={`h-px w-16 mx-auto my-6 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                <h2 className={`text-xl font-light mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    Page not found
                                </h2>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-4">
                            <p className={`text-lg mb-6 text-center ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                The page you're looking for doesn't exist or has been moved.
                            </p>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={() => window.history.back()}
                                    variant="outline"
                                    className={`cursor-pointer group px-6 py-2 transition-all duration-200 border ${isDark
                                        ? "bg-gray-950 text-white border-gray-800 hover:bg-gray-900"
                                        : "bg-white text-black border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <ArrowLeft size={16} className="mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                                    Go Back
                                </Button>
                                <Button
                                    onClick={() => window.location.href = '/'}
                                    className={`cursor-pointer group px-6 py-2 transition-all duration-200 ${isDark
                                        ? "bg-white text-black hover:bg-gray-100"
                                        : "bg-black text-white hover:bg-gray-900"
                                        }`}
                                >
                                    <Home size={16} className="mr-2 transition-transform duration-200 group-hover:scale-110" />
                                    Return Home
                                </Button>
                            </div>
                        </CardContent>

                        {/* <CardFooter className="flex justify-center pt-4 pb-8">
                            <div className={`h-px w-12 mx-auto mb-6 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        </CardFooter> */}
                    </Card>
                </div>

                {/* Footer */}
                <div className="mt-10 text-center">
                    <p className={`text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        © {new Date().getFullYear()} Taskk
                    </p>
                </div>
            </div>

            {/* Add CSS for glitch animations with much darker grays for dark mode */}
            <style jsx>{`
                @keyframes glitch {
                0% {
                    transform: translate(0);
                }
                20% {
                    transform: translate(-2px, 2px);
                }
                40% {
                    transform: translate(-2px, -2px);
                }
                60% {
                    transform: translate(2px, 2px);
                }
                80% {
                    transform: translate(2px, -2px);
                }
                100% {
                    transform: translate(0);
                }
                }
                
                h1 span {
                    position: relative;
                    display: inline-block;
                }
                
                h1 span:before,
                h1 span:after {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    animation: glitch 3s infinite alternate-reverse;
                    color: ${isDark ? '#1a1a1a' : '#f0f0f0'};
                }
                
                h1 span:before {
                    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                    animation-delay: -0.2s;
                    text-shadow: ${isDark ? '2px 0 #222, -2px 0 #111' : '2px 0 #ddd, -2px 0 #eee'};
                }
                
                h1 span:after {
                    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
                    animation-delay: -0.4s;
                    text-shadow: ${isDark ? '-2px 0 #222, 2px 0 #111' : '-2px 0 #ddd, 2px 0 #eee'};
                }
            `}</style>
        </div>
    );
}