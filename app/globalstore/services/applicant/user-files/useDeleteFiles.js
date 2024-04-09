import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deleteCVDB = createApi({
  reducerPath: "deleteCVDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/userfiles/cv",
  }),
  endpoints: (builder) => ({
    deleteCV: builder.mutation({
      query: (user_id) => `/${user_id}`,
      method: "DELETE",
    }),
  }),
});

export const { useDeleteCVMutation } = deleteCVDB;
