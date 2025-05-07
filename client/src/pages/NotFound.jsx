import { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";

export default function NotFound() {
    const { theme, setTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [glitchCycle, setGlitchCycle] = useState(0);
    const [originalTheme, setOriginalTheme] = useState(null);

    useEffect(() => {
        // Store the original theme when component mounts
        setOriginalTheme(theme);
        
        // Force dark theme
        setTheme("dark");

        // Entrance animation
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        // Continuous glitch effect
        const glitchInterval = setInterval(() => {
            setGlitchCycle(prev => (prev + 1) % 3); // Cycle between 0, 1, 2 states
        }, 2000);

        // Cleanup: restore original theme when unmounting
        return () => {
            if (originalTheme) {
                setTheme(originalTheme);
            }
            clearTimeout(timer);
            clearInterval(glitchInterval);
        };
    }, []);

    // Dynamic glitch styling based on cycle
    const getGlitchStyles = () => {
        if (glitchCycle === 0) return "";

        if (glitchCycle === 1) {
            return "after:content-['404'] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-90 after:transform after:-translate-x-1 after:translate-y-1 after:text-gray-900";
        }

        return "before:content-['404'] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:opacity-90 before:transform before:translate-x-1 before:-translate-y-1 before:text-gray-900";
    };

    // Handle navigation while restoring original theme
    const handleGoBack = () => {
        if (originalTheme) {
            setTheme(originalTheme);
        }
        window.history.back();
    };

    const handleGoHome = () => {
        if (originalTheme) {
            setTheme(originalTheme);
        }
        window.location.href = '/';
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
            <div className={`max-w-lg w-full transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0 transform translate-y-4"}`}>
                {/* Main card */}
                <div className="relative">
                    <Card className="overflow-hidden bg-black border-gray-800">
                        <CardHeader className="pt-16 pb-0">
                            {/* 404 Text with continuous glitch effect */}
                            <div className="text-center">
                                <h1
                                    className="text-9xl font-bold tracking-tighter mb-2 relative"
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
                                <div className="h-px w-16 mx-auto my-6 bg-gray-800"></div>
                                <h2 className="text-xl font-light mb-2 text-gray-400">
                                    Page not found
                                </h2>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-4">
                            <p className="text-lg mb-6 text-center text-gray-300">
                                The page you're looking for doesn't exist or has been moved.
                            </p>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleGoBack}
                                    variant="outline"
                                    className="cursor-pointer group px-6 py-2 transition-all duration-200 border bg-gray-950 text-white border-gray-800 hover:bg-gray-900"
                                >
                                    <ArrowLeft size={16} className="mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                                    Go Back
                                </Button>
                                <Button
                                    onClick={handleGoHome}
                                    className="cursor-pointer group px-6 py-2 transition-all duration-200 bg-white text-black hover:bg-gray-100"
                                >
                                    <Home size={16} className="mr-2 transition-transform duration-200 group-hover:scale-110" />
                                    Return Home
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="mt-10 text-center">
                    <p className="text-sm text-gray-600">
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
                    color: #1a1a1a;
                }
                
                h1 span:before {
                    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                    animation-delay: -0.2s;
                    text-shadow: 2px 0 #222, -2px 0 #111;
                }
                
                h1 span:after {
                    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
                    animation-delay: -0.4s;
                    text-shadow: -2px 0 #222, 2px 0 #111;
                }
            `}</style>
        </div>
    );
}