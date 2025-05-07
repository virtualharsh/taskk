import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export default function ModeToggle({ size = "small" }) {
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
                className="w-8 h-8 p-0 flex items-center justify-center cursor-pointer transition-colors"

            >
                {theme === "dark" ? (
                    <Sun style={{ width: `${size === "small" ? "16px" : "20px"}`, height: "auto" }} />
                ) : (
                    <Moon style={{ width: `${size === "small" ? "16px" : "20px"}`, height: "auto" }} />
                )}
            </Button>

            {isTransitioning && (
                <div className="pointer-events-none fixed inset-0 z-0 transition-overlay"></div>
            )}
        </>
    )
}  