import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newPasswordDB = createApi({
  reducerPath: "newPasswordDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/auth/password/reset",
  }),
  endpoints: (builder) => ({
    postNewPassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostNewPasswordMutation } = newPasswordDB;