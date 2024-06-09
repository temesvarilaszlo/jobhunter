import { useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../../store/jobApiSlice";
import { JobForm } from "./JobForm";

export const JobFormSelector = ({ newJob }) => {
    if (!newJob) {
        const { jobId } = useParams();
        const { data: job, error, isLoading, isSuccess } = useGetJobByIdQuery(jobId);

        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>An error occurred: {error.message}</p>;
        if (isSuccess) {
            return <JobForm job={job} />;
        }
    }

    return <JobForm job={null}/>;
}