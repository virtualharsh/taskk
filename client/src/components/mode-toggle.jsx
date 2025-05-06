import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export default function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [isTransitioning, setIsTransitioning] = useState(false)

    const toggleTheme = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setTheme(theme === "dark" ? "light" : "dark")
        }, 50) // trigger theme quickly
        setTimeout(() => {
            setIsTransitioning(false)
        }, 300) // remove after fade
    }

    return (
        <>
            <Button
                onClick={toggleTheme}
                variant="icon"
                className="w-8 h-8 p-0 flex items-center justify-center cursor-pointer rounded-full shadow-md border transition-colors"
                style={{
                    backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff", // dark and light backgrounds
                    borderColor: theme === "dark" ? "#444444" : "#ddd", // light border in light mode, dark border in dark mode
                    color: theme === "dark" ? "#fff" : "#333" // light text for dark mode, dark text for light mode
                }}
            >
                {theme === "dark" ? (
                    <Sun style={{ width: "20px", height: "20px" }} />
                ) : (
                    <Moon style={{ width: "20px", height: "20px" }} />
                )}
            </Button>

            {isTransitioning && (
                <div className="pointer-events-none fixed inset-0 z-0 transition-overlay"></div>
            )}
        </>
    )
}
