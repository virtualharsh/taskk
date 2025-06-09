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
import TaskSettings from "./pages/TaskSettings";
import Trash from "./pages/Trash";
import ViewTask from "./pages/ViewTask";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export const routes = [
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword />},
    { path: '/reset-password/:userId', element: <ResetPassword />},
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
            { path: 'trash', element: <Trash /> },
            { path: ':taskID', element: <Notes /> },
            { path: ':taskID/settings', element: <TaskSettings /> },
        ]
    },
    {
        path: '/task/:taskID/',
        element: <ViewTask />,
        children: [
            { path: 'view', element: <ViewTask /> }
        ]
    },
    { path: '*', element: <NotFound /> }
];