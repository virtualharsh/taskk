import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup"
import AuthUser from "./pages/AuthUser"

export const routes = [
    { path: '/', element: <Landing /> },
    { path: '/home', element: <Home />, private: true },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/auth', element: <AuthUser /> },
    { path: '*', element: <NotFound /> }
];