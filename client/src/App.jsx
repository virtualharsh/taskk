// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PrivateRoute from './utils/PrivateRoute';
import { routes } from './Routes';
import { Toaster } from 'sonner';


function App() {

    return (
        <>
            <Routes>
                {routes.map(({ path, element, private: isPrivate }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            isPrivate ? (
                                <PrivateRoute >
                                    {element}
                                </PrivateRoute>
                            ) : (
                                element
                            )
                        }
                    />
                ))}
            </Routes>
            <Toaster richColors position='top-right' />
        </>

    );
}

export default App;