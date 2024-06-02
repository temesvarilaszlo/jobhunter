import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

function Layout() {
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.role);

    return (
        <>
            <nav>
                <a href="">asfd</a>
                <p>{user ?? "Nincs bejelentkezve"}</p>
                <p>{role ?? "Nincs bejelentkezve"}</p>
            </nav>
            <Outlet />
        </>
    );
}


export default Layout;