import { Navigate, useLocation } from 'react-router-dom';
import { AuthService } from '../../services/auth-service';
import type { JSX } from 'react';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const isAuthenticated = AuthService.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
