import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  // http://localhost:5000/payment/success?transactionId=tran_1755345609022_5108&message=Payment%20Completed&amount=5000&status=success
  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");

  return (
    <section className="section">
      <h2 className="font-semibold text-2xl mb-4">Payment Successfull</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Transacton ID</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>{message}</TableCell>
            <TableCell>{transactionId}</TableCell>
            <TableCell className="text-right">${amount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default PaymentSuccess;