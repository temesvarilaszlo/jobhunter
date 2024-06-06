import { useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../../store/jobApiSlice"; // Assuming you have this endpoint

export const JobDetail = () => {
    const { jobId } = useParams();
    const { data: job, error, isLoading, isSuccess } = useGetJobByIdQuery(jobId); // Fetch job by ID

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;
    if (isSuccess) {
        return (
            <div>
                <h1>{job.company}</h1>
                <h1>{job.position}</h1>
                <p>{job.description}</p>
                {/* Display other job details */}
            </div>
        );
    }

    return null;
};