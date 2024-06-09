import { useParams } from "react-router-dom";
import { useGetApplicantsForJobQuery } from "../../store/applicantApiSlice";
import { useSelector } from "react-redux";

export const ApplicantList = () => {
    const { jobId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const { data: applicants, error, isLoading, isSuccess } = useGetApplicantsForJobQuery({jobId, token});
    // const resp = useGetApplicantsForJobQuery({jobId, token});
    // console.log(resp);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;
    if (isSuccess) {
        // console.log(resp);
        if (applicants.length === 0){
            return <p className="mt-4 text-2xl font-bold text-center mx-auto">Erre az állásra nincsenek jelentkezők.</p>
        }
        return (
            <table className=" my-4 mx-auto table-auto w-full max-w-2xl bg-slate-200 rounded-lg">
                <tbody>
                    {applicants.map((elem, ind) => (
                        <tr key={ind} className=" border-b-2 odd:bg-slate-100 even:bg-slate-200">
                            <td className=" p-2 text-gray-500">{elem.user.fullname}</td>
                            <td className=" p-2">{elem.user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return null;
}