import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const infoUserDB = createApi({
  reducerPath: "infoUserDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/users/me",
    prepareHeaders: (headers) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("kTnKETkt="))
        .split("=")[1];
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInfoUser: builder.query({
      query: () => "",
      method: "GET",
    }),
  }),
});

export const { useGetInfoUserQuery } = infoUserDB;
