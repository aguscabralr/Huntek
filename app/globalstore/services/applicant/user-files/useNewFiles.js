import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newFilesDB = createApi({
  reducerPath: "newFilesDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/userfiles",
  }),
  endpoints: (builder) => ({
    postNewFiles: builder.mutation({
      query: ({ user_id, data }) => ({
        url: `/${user_id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostNewFilesMutation } = newFilesDB;
