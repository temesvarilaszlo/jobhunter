import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Menubar } from 'primereact/menubar';
import { logout } from "../store/authSlice";

function Layout() {
    const user = useSelector((state) => state.auth.user);
    const role = user?.role;
    const token = useSelector((state) => state.auth.token);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mainMenu = {
        label: 'Főoldal',
        command: () => navigate("/"),
    };
    const profile = {
        label: 'Profilom',
        command: () => navigate("/profile"),
    }
    const logoutNavItem = {
        label: 'Kijelentkezés',
        command: () => {
            dispatch(logout());
            navigate("/")
        },
    }

    const guestNavItems = [
        {...mainMenu},
        {
            label: 'Regisztráció',
            url: "/register",
        },
        {
            label: 'Bejelentkezés',
            url: "/login",
        },
    ];

    const jobseekerNavItems = [
        {...mainMenu},
        {...profile},
        {...logoutNavItem},
    ];

    const companyNavItems = [
        {...mainMenu},
        {...profile},
        {
            label: 'Új álláshirdetés',
            command: () => navigate('/newjob'),
        },
        {...logoutNavItem},
    ];

    const isGuest = user === null;
    const isJobseeker = !isGuest && role === 'jobseeker';
    const isCompany = !isGuest && role === 'company';

    const logo = <button onClick={() => navigate("/")}><h1 className=" text-lg font-bold">Jobhunter</h1></button>
    const className = " bg-slate-300";

    return (
        <>
            {isGuest && <Menubar model={guestNavItems} className={className} start={logo}/>}
            {isJobseeker && <Menubar model={jobseekerNavItems} className={className} start={logo}/>}
            {isCompany && <Menubar model={companyNavItems} className={className} start={logo}/>}

            <Outlet />
        </>
    );
}


export default Layout;