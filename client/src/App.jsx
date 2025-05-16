import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { routes } from './Routes';
import { Toaster } from 'sonner';

// Recursive function to handle nested routes
const renderRoutes = (routes) =>
    routes.map(({ path, element, private: isPrivate, children }) => {
        const routeElement = isPrivate ? (
            <PrivateRoute>{element}</PrivateRoute>
        ) : (
            element
        );

        return (
            <Route key={path} path={path} element={routeElement}>
                {children && renderRoutes(children)} {/* Recursive call for nested routes */}
            </Route>
        );
    });

function App() {
    return (
        <>
            <Routes>{renderRoutes(routes)}</Routes>
            <Toaster richColors position="top-right" />
        </>
    );
}

export default App;
