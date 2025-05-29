import { Outlet, Navigate } from 'react-router';
import { useUser } from '../../contextProviders/UserProvider'; 


export default function ProtectedRoutes() {
    const user = useUser();

    if (!user.currentUser) {
        return <Navigate to="login" />
    }

    return (
        <Outlet />
    )
}