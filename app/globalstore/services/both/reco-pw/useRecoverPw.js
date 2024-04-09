import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const recoverDB = createApi({
  reducerPath: "recoverDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/auth/password/recovery",
  }),
  endpoints: (builder) => ({
    getRecovery: builder.mutation({
      query: (email) => `/${email}`,
      method: "GET",
    }),
  }),
});

export const {useGetRecoveryMutation} = recoverDB;
