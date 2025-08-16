import { useGetMeQuery } from "@/redux/features/auth/auth.api";

const useRole = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  return {
    role: data?.data?.role,
    isLoading,
  };
};

export default useRole;
