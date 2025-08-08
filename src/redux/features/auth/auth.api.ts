import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, ISendOTP, IVerifyOTP } from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useRegisterMutation, useLoginMutation, useSendOTPMutation, useVerifyOTPMutation } =
  authApi;
