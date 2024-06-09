import { useSelector } from "react-redux";
import { useDeleteJobByIdMutation, useGetJobsQuery } from "../../store/jobApiSlice";
import { useNavigate } from "react-router-dom";

export const CompanyProfile = () => {
    const companyId = useSelector((state) => state.auth.user.id);
    const token = useSelector((state) => state.auth.token);
    const { data: jobs, error, isLoading, isSuccess } = useGetJobsQuery(`?userId=${companyId}`);
    const [apiDelete, result] = useDeleteJobByIdMutation();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const response = await apiDelete({token, id});
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;
    if (isSuccess) {
        return (
            <>
                <h1 className="text-xl font-bold">A hirdetéseid</h1>
                {jobs.map((job, ind) => (
                    <div key={ind} className="bg-slate-200 flex flex-row flex-wrap gap-2 p-2 rounded-xl w-full max-w-4xl justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold">{job.position}</h3>
                            <div className="flex flex-row flex-wrap gap-2">
                                <p className="text-gray-500">
                                    <i className="pi pi-briefcase"></i> {job.type}
                                </p>
                                <p className="text-gray-500">
                                    <i className="pi pi-map-marker"></i> {job.city}
                                </p>
                                <p className="text-gray-500">
                                    <i className="pi pi-money-bill"></i> {job.salaryFrom} - {job.salaryTo} Ft
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1 items-center">
                            <button className="p-2 bg-slate-100 rounded-lg hover:bg-slate-300 max-h-10"
                                onClick={() => navigate(`jobs/${job.id}`)}
                            >
                                Szerkesztés <i className="pi pi-pencil"></i>
                            </button>
                            <button className="p-2 bg-slate-100 rounded-lg hover:bg-slate-300 max-h-10"
                                onClick={() => navigate(`jobs/${job.id}/applicants`)}
                            >
                                Megtekintés <i className="pi pi-eye"></i>
                            </button>
                            <button className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-700 max-h-10"
                                onClick={() => handleDelete(job.id)}
                            >
                                Törlés <i className="pi pi-trash"></i>
                            </button>
                        </div>
                    </div>
                ))}
                <button className=' p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-700'
                    onClick={() => navigate('/newjob')}
                >
                    Hirdetés hozzáadása <i className="pi pi-plus"></i>
                </button> 
            </>
        );
    }
}