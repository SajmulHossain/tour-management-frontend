/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const OTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const Verify = () => {
  const [confirm, setConfirm] = useState(false);
  const { state } = useLocation();
  const [timer, setTimer] = useState(120);
  const navigate = useNavigate();

  const [sendOtp] = useSendOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof OTPSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    try {
      await verifyOTP({ email: state, otp: data.pin }).unwrap();
      toast.success("OTP Verified", { id: toastId });
      navigate("/");
    } catch (error: any) {
      toast.error(error.data.message || "Failed to verify OTP", {
        id: toastId,
      });
    }
  };

  const handleSendOTP = async () => {
    const toastId = toast.loading("Sending OTP");
    try {
      await sendOtp({ email: state }).unwrap();
      toast.success("OTP Sent", { id: toastId });
      setConfirm(true);
      setTimer(120);
    } catch (error: any) {
      toast.error(error.data.message || "Failed to sent otp", { id: toastId });
    }
  };

  useEffect(() => {
    if (!state) {
      navigate(-1);
    }
  }, [navigate, state]);

  useEffect(() => {
    if (!state || !confirm) {
      return;
    }

    const timerId = setInterval(() => {
      // if(state && confirm) {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      console.log("tick");
      // }
    }, 1000);

    return () => clearInterval(timerId);
  }, [confirm, state]);

  return (
    <section className="min-h-screen place-items-center grid">
      {confirm ? (
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Verify Your Email Address</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          type="button"
                          disabled={timer !== 0}
                          onClick={handleSendOTP}
                          variant={"link"}
                          className={cn("p-0 h-0", {
                            hidden: timer !== 0,
                          })}
                        >
                          Resend OTP
                        </Button>{" "}
                        {timer > 0 ? (
                          <span>
                            Resend OTP in {timer.toString().padStart(2, "0")}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button form="otp-form" type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Verify Your Email Address</CardTitle>
            <CardDescription>
              We will send a OTP to your email {state}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-col gap-2">
            <Button onClick={handleSendOTP} className="w-full">
              Submit
            </Button>
          </CardFooter>
        </Card>
      )}
    </section>
  );
};

export default Verify;
