import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const chatsDB = createApi({
  reducerPath: "chatsDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/chats/chats-user",
  }),
  endpoints: (builder) => ({
    getChats: builder.mutation({
      query: (user_id) => `?user_id=${user_id}`,
      method: "GET",
    }),
  }),
});

export const {useGetChatsMutation} = chatsDB;