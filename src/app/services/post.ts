import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface Post {
  id: number;
  name: string;
}
interface ListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    listPosts: builder.query<ListResponse<Post>, number | void>({
      query: (page = 1) => `posts?page=${page}`,
    }),
  }),
});

export const { useListPostsQuery } = api;
