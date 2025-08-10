import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, ISendOTP, IVerifyOTP } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        data,
      }),
    }),
    login: builder.mutation<IResponse<null>, ILogin>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
    }),
    logout: builder.mutation<IResponse<null>, null>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    sendOTP: builder.mutation<IResponse<null>, ISendOTP>({
      query: (data) => ({
        url: "/otp/send",
        method: "POST",
        data,
      }),
    }),
    verifyOTP: builder.mutation<IResponse<null>, IVerifyOTP>({
      query: (data) => ({
        url: "/otp/verify",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
} = authApi;
