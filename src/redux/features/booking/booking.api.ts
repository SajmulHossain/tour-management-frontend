import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleBooking: builder.query({
            query: (id) => ({
                url: `/booking/${id}`,
                method: "GET"
            })
        }),
        addBooking: builder.mutation({
            query: data => ({
                url: "/booking",
                method: "POST",
                data
            }),
            transformResponse: response => response.data
        })
    })
})

export const { useGetSingleBookingQuery, useAddBookingMutation } = bookingApi;