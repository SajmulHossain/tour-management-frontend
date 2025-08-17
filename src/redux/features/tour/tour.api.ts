import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITour } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTourType: builder.query({
      query: (params) => ({
        url: "/tour/tour-types",
        method: "GET",
        params
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
    getAllTours: builder.query<ITour[], unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params,
      }),
      providesTags: ["TOURS"],
      transformResponse: (response: IResponse<ITour[]>) => response.data,
    }),
    removeTour: builder.mutation({
      query: (id) => ({
        url: `/tour/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOURS"],
    }),
    addTour: builder.mutation({
      query: (data) => ({
        url: `/tour`,
        method: "POST",
        data
      }),
      invalidatesTags: ["TOURS"],
    }),
  }),
});

export const {
  useGetTourTypeQuery,
  usePostTourTypeMutation,
  useGetAllToursQuery,
  useRemoveTourTypeMutation,
  useRemoveTourMutation,
  useAddTourMutation
} = tourApi;
