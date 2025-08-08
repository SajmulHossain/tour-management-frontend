import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
