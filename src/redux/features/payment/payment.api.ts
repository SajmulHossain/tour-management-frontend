import { baseApi } from "@/redux/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initPayment: builder.mutation({
      query: (id) => ({
        url: `/payment/init-payment/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useInitPaymentMutation } = paymentApi;
