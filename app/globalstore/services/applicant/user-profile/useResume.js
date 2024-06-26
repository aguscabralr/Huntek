import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resumeDB = createApi({
  reducerPath: "resumeDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/profile/user-profiles/me/add-resume",
    prepareHeaders: (headers) => {
      const token = document.cookie.split("; ").find((row) => row.startsWith("kTnKETkt=")).split("=")[1];
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postResume: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostResumeMutation } = resumeDB;