import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTourType: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["TOUR_TYPE"]
    }),
    postTourType: builder.mutation({
      query: (data) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data,
      }),
      invalidatesTags: ["TOUR_TYPE"]
    }),
  }),
});

export const { useGetTourTypeQuery, usePostTourTypeMutation } = tourApi;