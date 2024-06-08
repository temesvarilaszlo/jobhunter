import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const jobApiSlice = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/jobs",
    }),
    tagTypes: ["Jobs"],
    endpoints: (build) => ({
        getJobs: build.query({
            query: (filters) => filters,
            transformResponse: response => response.data,
            providesTags: ["Jobs"],
        }),
        getJobById: build.query({
            query: (id) => `/${id}`,
        }),
        deleteJobById: build.mutation({
            query: ({token, id}) => ({
                url: "/" + id,
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }),
            invalidatesTags: ["Jobs"],
        })
    }),
});

export const { useGetJobsQuery, useGetJobByIdQuery, useDeleteJobByIdMutation } = jobApiSlice;