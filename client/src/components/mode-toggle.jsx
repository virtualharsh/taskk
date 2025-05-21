import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export default function ModeToggle({ size = "small" }) {
    const { theme, setTheme } = useTheme();
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleTheme = () => {
        // Start animation
        setIsAnimating(true);

        // Change theme after a short delay
        setTimeout(() => {
            setTheme(theme === "dark" ? "light" : "dark");
        }, 250);

        // Reset animation state
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    };

    return (
        <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-transparent focus:bg-transparent"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="relative">
                {/* Sun icon */}
                <Sun
                    className={`absolute transition-all duration-300 ease-spring ${theme === "dark"
                            ? "opacity-100 scale-100 rotate-0"
                            : "opacity-0 scale-75 rotate-45"
                        }`}
                    style={{ width: size === "small" ? "16px" : "20px", height: "auto" }}
                />

                {/* Moon icon */}
                <Moon
                    className={`transition-all duration-300 ease-spring ${theme === "light"
                            ? "opacity-100 scale-100 rotate-0"
                            : "opacity-0 scale-75 -rotate-45"
                        }`}
                    style={{ width: size === "small" ? "16px" : "20px", height: "auto" }}
                />
            </div>

            {/* Simple background effect */}
            <span
                className={`absolute inset-0 rounded-full transition-colors duration-500 ${isAnimating ? "bg-secondary" : "bg-transparent"
                    }`}
                style={{
                    opacity: isAnimating ? 0.8 : 0,
                    transform: isAnimating ? "scale(1)" : "scale(0.8)"
                }}
            />
        </Button>
    );
}