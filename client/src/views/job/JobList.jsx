import { useGetJobsQuery } from "../../store/jobApiSlice";
import { Job } from "./Job";

export const JobList = () => {
    const { data: jobs, error, isLoading, isSuccess } = useGetJobsQuery();
    console.log(jobs);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;
    if (isSuccess) {
        return (
            <div className="flex flex-row flex-wrap gap-4 m-2">
                {jobs.map((job, ind) => <Job job={job} key={ind} />)}
            </div>
        );
    }
    return <p>lol</p>;
}