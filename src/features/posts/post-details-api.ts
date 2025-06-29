import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../lib/const'
import type { TCommentSchema, TPostSchema } from './posts-schema'
import { commentSchema, postSchema } from './posts-schema'

export const postDetailsApi = createApi({
  reducerPath: 'postDetailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getPost: builder.query<TPostSchema, number>({
      query: id => `posts/${id}`,
      transformResponse: (response: unknown) => {
        return postSchema.parse(response)
      },
    }),
    getComments: builder.query<TCommentSchema[], number>({
      query: postId => `comments?postId=${postId}`,
      transformResponse: (response: unknown) => {
        if (Array.isArray(response)) {
          return response.map(comment => commentSchema.parse(comment))
        }
        return []
      },
    }),
  }),
})

export const { useGetPostQuery, useGetCommentsQuery } = postDetailsApi
