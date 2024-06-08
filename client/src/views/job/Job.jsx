import { Card } from 'primereact/card';
import { useNavigate } from "react-router-dom";

export const Job = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <Card title={job.company} className=' bg-slate-200'>
            <div className='flex flex-col gap-1 w-48'>
                <p className='font-bold'>{job.position}</p>
                <p className=' font-bold'>
                    {new Intl.NumberFormat("de-DE", { style: "currency", currency: "HUF" }).format(job.salaryFrom)}
                    -
                    {new Intl.NumberFormat("de-DE", { style: "currency", currency: "HUF" }).format(job.salaryTo)}
                </p>
                <p className=' text-sm'>{job.city}</p>
                <p className='text-sm'>{job.type}</p>
                <button className=' p-2 bg-sky-500 text-white rounded-lg max-w-28 hover:bg-sky-700'
                    onClick={() => navigate(`/jobs/${job.id}`)}
                >
                    Részletek <i className='pi pi-angle-double-right'></i>
                </button>
            </div>
        </Card>
    );
}