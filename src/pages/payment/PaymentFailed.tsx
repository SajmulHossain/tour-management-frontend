/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader, CardTitle
} from "@/components/ui/card";
import { toast } from "sonner";

const PaymentFailed = () => {
    // const [initPayment] = useInitPaymentMutation();
    
    // const [searchParams] = useSearchParams();
    // const transactionId = searchParams.get("transactionId");

    const handleInitPayment = async () => {
        const toastId = toast.loading("Initiating Payment");

        try {
        //    const res = await initPayment(transactionId).unwrap();
        //    console.log(res);
        toast.warning("Service is not available right now",{id: toastId})
            
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to initiate payment", {id: toastId});
        }
    }
  return (
    <section className="section">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-destructive">
            Payment Failed
          </CardTitle>
          <CardDescription>
            Your payment has been failed. Click on try again button to complete
            your payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleInitPayment}>Try Again</Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default PaymentFailed;