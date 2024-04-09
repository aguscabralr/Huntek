import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const loginDB = createApi({
  reducerPath: "loginDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/auth/login",
  }),
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {usePostLoginMutation} = loginDB;
