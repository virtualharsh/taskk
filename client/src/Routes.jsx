import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

export const routes = [
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/user/:username', element: <Home /> , private:true},
    { path: '*', element: <NotFound /> }
];