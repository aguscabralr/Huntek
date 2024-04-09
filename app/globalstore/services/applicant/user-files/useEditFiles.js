import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const editFilesDB = createApi({
  reducerPath: "editFilesDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/userfiles",
  }),
  endpoints: (builder) => ({
    editFiles: builder.mutation({
      query: ({ user_id, data }) => ({
        url: `/${user_id}`,
        method: "PUT",
        body: data
      }),
    }),
  }),
});

export const { useEditFilesMutation } = editFilesDB;