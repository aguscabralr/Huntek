import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deletePicDB = createApi({
  reducerPath: "deletePicDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/userfiles/profile-picture",
  }),
  endpoints: (builder) => ({
    deletePic: builder.mutation({
      query: (user_id) => `/${user_id}`,
      method: "DELETE",
    }),
  }),
});

export const { useDeletePicMutation } = deletePicDB;