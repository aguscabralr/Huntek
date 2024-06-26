import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const messagesDB = createApi({
  reducerPath: "messagesDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/messages/messages",
  }),
  endpoints: (builder) => ({
    getMessages: builder.mutation({
      query: (chat_id) => `?chat_id=${chat_id}`,
      method: "GET",
    }),
  }),
});

export const {useGetMessagesMutation} = messagesDB;