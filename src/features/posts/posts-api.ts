import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../lib/const'
import type { TPostSchema } from './posts-schema'
import { postSchema } from './posts-schema'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getPosts: builder.query<TPostSchema[], void>({
      query: () => 'posts',
      transformResponse: (response: unknown) => {
        if (Array.isArray(response)) {
          return response.map(post => postSchema.parse(post))
        }
        return []
      },
    }),
  }),
})

export const { useGetPostsQuery } = postsApi
