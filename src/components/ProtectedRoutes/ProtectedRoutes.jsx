import { Outlet, Navigate } from 'react-router';
import { useUser } from '../../hooks/UserProvider'; 


export default function ProtectedRoutes() {
    const user = useUser();

    if (!user.storedUser) {
        return <Navigate to="login" />
    }

    return (
        <Outlet />
    )
}