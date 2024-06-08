import { useSelector, useDispatch } from 'react-redux';
import { JobSeekerProfile } from './JobSeekerProfile';
import { CompanyProfile } from './CompanyProfile';

export const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const dataToShow = [
        { name: "Név", data: user.fullname },
        { name: "Email", data: user.email },
        { name: "Státusz", data: user.role === "jobseeker" ? "Munkavállaló" : "Munkáltató" },
    ];
    
    return (
        <div className="flex flex-col items-center gap-2 my-8">
            <h1 className="text-xl font-bold">Személyes adatok</h1>
            <table className=" my-4 mx-auto table-auto w-full max-w-2xl bg-slate-200 rounded-lg">
                <tbody>
                    {dataToShow.map((elem, ind) => (
                        <tr key={ind} className=" border-b-2 odd:bg-slate-100 even:bg-slate-200">
                            <td className=" p-2 text-gray-500">{elem.name}</td>
                            <td className=" p-2">{elem.data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {user.role === "jobseeker" && <JobSeekerProfile />}
            {user.role === "company" && <CompanyProfile />}
        </div>

    );
}