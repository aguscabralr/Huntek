import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const createChatDB = createApi({
  reducerPath: "createChatDB",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ec2-54-221-107-231.compute-1.amazonaws.com/api/v1/chats/create-chat",
  }),
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useCreateChatMutation} = createChatDB;