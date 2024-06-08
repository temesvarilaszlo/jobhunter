import { useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../../store/jobApiSlice";

export const JobDetail = () => {
    const { jobId } = useParams();
    const { data: job, error, isLoading, isSuccess } = useGetJobByIdQuery(jobId);

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
        return (
            // <div>
            //     <h1>{job.company}</h1>
            //     <h1>{job.position}</h1>
            //     <p>{job.description}</p>
            //     {/* Display other job details */}
            // </div>
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
        );
    }

    return null;
};