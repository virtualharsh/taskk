import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}