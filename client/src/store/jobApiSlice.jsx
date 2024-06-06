import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const jobApiSlice = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/jobs",
    }),
    tagTypes: ["Jobs"],
    endpoints: (build) => ({
        getJobs: build.query({
            query: () => "",
            transformResponse: response => response.data,
            providesTags: ["Jobs"],
        }),
        getJobById: build.query({
            query: (id) => `/${id}`,
        }),
    }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = jobApiSlice;