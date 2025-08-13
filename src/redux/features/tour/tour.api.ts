import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTourType: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["TOUR_TYPE"],
    }),
    postTourType: builder.mutation({
      query: (data) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data,
      }),
      invalidatesTags: ["TOUR_TYPE"],
    }),
    removeTourType: builder.mutation({
      query: (id) => ({
        url: `/tour/tour-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR_TYPE"],
    }),
    getAllTours: builder.query({
      query: () => ({
        url: "/tour",
        method: "GET",
      }),
      providesTags: ["TOURS"],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const {
  useGetTourTypeQuery,
  usePostTourTypeMutation,
  useGetAllToursQuery,
  useRemoveTourTypeMutation
} = tourApi;
