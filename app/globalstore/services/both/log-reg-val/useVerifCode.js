import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const verifDB = createApi({
  reducerPath: "verifDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/users/account-activation",
  }),
  endpoints: (builder) => ({
    postVerif: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {usePostVerifMutation} = verifDB;
