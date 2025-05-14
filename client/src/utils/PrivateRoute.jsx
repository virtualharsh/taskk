// utils/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authToken');
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
