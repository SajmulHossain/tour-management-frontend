import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["DIVISION"],
    }),
    addDivision: builder.mutation({
      query: (data) => ({
        url: "/division/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    deleteDivision: builder.mutation({
      query: (id) => ({
        url: `/division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const { useGetDivisionQuery, useAddDivisionMutation, useDeleteDivisionMutation } = divisionApi;
