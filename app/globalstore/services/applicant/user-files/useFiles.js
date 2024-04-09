import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const filesUserDB = createApi({
  reducerPath: "filesUserDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/userfiles",
  }),
  endpoints: (builder) => ({
    getFiles: builder.query({
      query: (user_id) => `/${user_id}`,
      method: "GET",
    }),
  }),
});

export const { useGetFilesQuery } = filesUserDB;
