import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const registerDB = createApi({
  reducerPath: "registerDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/profile/create",
  }),
  endpoints: (builder) => ({
    postUsers: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {usePostUsersMutation} = registerDB;
