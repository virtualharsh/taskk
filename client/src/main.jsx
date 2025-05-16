import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { ThemeProvider } from "@/components/theme-provider"


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter >
            <ThemeProvider defaultTheme="dark">
                <App />
            </ThemeProvider>
        </BrowserRouter >
    </StrictMode>,
)