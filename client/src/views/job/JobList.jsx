import { useGetJobsQuery } from "../../store/jobApiSlice";
import { Job } from "./Job";
import { useState } from 'react';
import { JobFilter } from "./JobFilter";


export const JobList = () => {
    const initialFilters = {
        company: "",
        salaryFrom: 0,
        salaryTo: 2500000,
        type: "",
        city: "",
        homeOffice: 0,
    };
    const [filters, setFilters] = useState({...initialFilters});
    console.log(filters);

    let queryFilter = `?salaryFrom[$gte]=${filters.salaryFrom}&salaryTo[$lte]=${filters.salaryTo}`;
    queryFilter += filters.company !== "" ? `&company[$like]=%${filters.company}%` : "";
    queryFilter += filters.type !== "" ? `&type=${filters.type}` : "";
    queryFilter += filters.city !== "" ? `&city=${filters.city}` : "";
    queryFilter += filters.homeOffice !== 0 ? (filters.homeOffice === 1 ? `&homeOffice=true` : `&homeOffice=false`) : "";
    console.log(queryFilter);

    const { data: jobs, error, isLoading, isSuccess } = useGetJobsQuery(queryFilter);
    console.log(jobs);
    console.log(filters.type);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;
    if (isSuccess) {
        return (
            <>
                <JobFilter filters={filters} setFilters={setFilters} initialFilters={initialFilters} />
                <div className="flex flex-row flex-wrap gap-4 m-2 justify-center">
                    {jobs.map((job, ind) => <Job job={job} key={ind} />)}
                </div>
            </>
        );
    }
    return null;
}