import { Button } from "@/components/ui/button";
import { envVars } from "@/config/env.config";

const LoginWithGoogle = () => {
  return (
    <Button
      onClick={() => {
        window.open(`${envVars.baseUrl}/auth/google`);
      }}
      type="button"
      variant="outline"
      className="w-full cursor-pointer"
    >
      Login with Google
    </Button>
  );
};

export default LoginWithGoogle;
