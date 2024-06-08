import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const experienceApiSlice = createApi({
    reducerPath: "experienceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/experiences",
    }),
    tagTypes: ["Experiences"],
    endpoints: (build) => ({
        getExperiences: build.query({
            query: (token) => ({
                url: "",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }),
            transformResponse: response => response.data,
            providesTags: ["Experiences"],
        }),
    })
});

export const { useGetExperiencesQuery } = experienceApiSlice;