import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getUsersDB = createApi({
  reducerPath: "getUsersDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/profile/user-profiles/all",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      method: "GET",
    }),
  }),
});

export const { useGetUsersQuery } = getUsersDB;
