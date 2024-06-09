import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const applicantApiSlice = createApi({
    reducerPath: "applicantApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/applicants",
    }),
    tagTypes: ["Applicants"],
    endpoints: (build) =>({
        applyForJob: build.mutation({
            query: ({token, jobId}) => ({
                url: "",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: {jobId,},
            }),
            invalidatesTags: ["Applicants"],
        }),
        getApplicantsForJob: build.query({
            query: ({token, jobId}) => ({
                url: "?jobId=" + jobId,
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }),
            // transformResponse: response => response.data,
        }),
    }),
});

export const { useApplyForJobMutation, useGetApplicantsForJobQuery } = applicantApiSlice;