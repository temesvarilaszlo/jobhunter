import { useSelector } from "react-redux";
import { useGetExperiencesQuery } from "../../store/experienceApiSlice";

export const JobSeekerProfile = () => {
    const token = useSelector((state) => state.auth.token);

    const { data: experiences, error, isLoading, isSuccess } = useGetExperiencesQuery(token);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;
    if (isSuccess) {
        return (
            <>
                <h1 className="text-xl font-bold">Korábbi munkatapasztalat</h1>
                <table className=" my-4 mx-auto table-auto w-full max-w-2xl bg-slate-200 rounded-lg">
                    <tbody>
                        {experiences.map((elem, ind) => (
                            <tr key={ind} className=" border-b-2 odd:bg-slate-100 even:bg-slate-200">
                                <td className=" p-2 text-gray-500">{elem.company}</td>
                                <td className=" p-2">{elem.title}</td>
                                <td className=" p-2">{elem.interval}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
    return null;
    
    
}