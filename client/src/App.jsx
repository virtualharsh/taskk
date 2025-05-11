// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PrivateRoute from './utils/PrivateRoute';
import { routes } from './Routes';
import { Toaster } from 'sonner';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // fake login state

    return (
        <>
            <Routes>
                {routes.map(({ path, element, private: isPrivate }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            isPrivate ? (
                                <PrivateRoute isAuthenticated={isAuthenticated}>
                                    {element}
                                </PrivateRoute>
                            ) : (
                                element
                            )
                        }
                    />
                ))}
            </Routes>
            <Toaster richColors />
        </>

    );
}

export default App;