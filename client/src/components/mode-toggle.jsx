import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export default function ModeToggle({ size = "small" }) {
    const { theme, setTheme } = useTheme();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

    const toggleTheme = (e) => {
        // Get click position relative to viewport
        const x = e.clientX;
        const y = e.clientY;
        setClickPos({ x, y });

        setIsTransitioning(true);

        setTimeout(() => {
            setTheme(theme === "dark" ? "light" : "dark");
        }, 50);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <>
            <Button
                onClick={toggleTheme}
                variant="icon"
                className="w-8 h-8 p-0 flex items-center justify-center cursor-pointer transition-colors"
            >
                {theme === "dark" ? (
                    <Sun style={{ width: size === "small" ? "16px" : "20px", height: "auto" }} />
                ) : (
                    <Moon style={{ width: size === "small" ? "16px" : "20px", height: "auto" }} />
                )}
            </Button>

            {isTransitioning && <ThemeRevealOverlay x={clickPos.x} y={clickPos.y} />}
        </>
    );
}

// Separate component for overlay to keep JSX clean
function ThemeRevealOverlay({ x, y }) {
    return <div className="theme-reveal-overlay" style={{ "--click-x": `${x}px`, "--click-y": `${y}px` }} />;
}
