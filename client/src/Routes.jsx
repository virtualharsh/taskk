import HomePage from "./pages/HomePage";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import UserHome from "./pages/UserHome";
import Notes from "./pages/Notes";


export const routes = [
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    {
        path: '/user/:username/',
        element: <HomePage />, // acts as the layout
        private: true,
        children: [
            { path: '', element: <UserHome /> }, // /user/:username/
            { path: 'notifications', element: <Notifications /> },
            { path: 'settings', element: <Settings /> },
            { path: 'search', element: <Search /> },
            { path: ':taskID', element: <Notes /> }, // 🔥 new route added here
        ]
    },
    { path: '*', element: <NotFound /> }
];