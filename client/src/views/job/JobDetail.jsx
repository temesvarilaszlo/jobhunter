import { useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../../store/jobApiSlice";
import { useSelector } from "react-redux";
import { useApplyForJobMutation } from "../../store/applicantApiSlice";

export const JobDetail = () => {
    const { jobId } = useParams();
    const { data: job, error, isLoading, isSuccess } = useGetJobByIdQuery(jobId);
    const user = useSelector((state) => state.auth.user);
    const role = user?.role;
    const token = useSelector((state) => state.auth.token);

    const [apiApply, result] = useApplyForJobMutation();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;
    if (isSuccess) {
        const dataToShow = [
            {
                name: "Cég neve",
                data: job.company,
            },
            {
                name: "Pozíció",
                data: job.position,
            },
            {
                name: "Leírás",
                data: job.description,
            },
            {
                name: "Fizetési sáv",
                data: `${job.salaryFrom} - ${job.salaryTo} Ft`,
            },
            {
                name: "Foglalkoztatás típusa",
                data: job.type,
            },
            {
                name: "Település",
                data: job.city,
            },
            {
                name: "Home office",
                data: job.homeOffice === 1 ? "Van" : "Nincs",
            },
        ];

        const handleApply = async () => {
            if (role === "jobseeker"){
                const applyResponse = await apiApply({
                    token,
                    jobId: job.id,
                });
            }
        }

        return (
            <>
                <div className="flex flex-col items-center my-4">
                    {role === "jobseeker" &&
                        <button className='p-2 bg-sky-500 w-28 text-white rounded-lg hover:bg-sky-700'
                            onClick={handleApply}
                        >
                            Jelentkezés
                        </button>
                    }
                    {result.isError && result.error.status === 500 &&
                        <p className="text-red-600">Már jelentkezett erre az állásra!</p>
                    }
                    {result.isSuccess &&
                        <p className="text-green-600">Sikeres jelentkezés!</p>
                    }
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
                </div>
            </>
        );
    }

    return null;
};