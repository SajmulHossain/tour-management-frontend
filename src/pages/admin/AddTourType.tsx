import Delete from "@/components/Delete";
import AddTourModal from "@/components/modules/admin/tour/AddTourModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import type { Key } from "react";

const AddTourType = () => {
    const {data} = useGetTourTypeQuery(undefined);
    
  return (
    <section className="max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-center my-6">
        <h1 className="font-semibold text-xl">Tour Types</h1>
        <AddTourModal />
      </div>
      <Table className="border border-muted rounded-md">
        <TableCaption>A list of Tour Types</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((tourType: { _id: Key; name: string }) => (
            <TableRow key={tourType._id}>
              <TableCell className="font-medium">{tourType.name}</TableCell>
              <TableCell className="text-right">
                <Delete type="tour type" project_name={tourType.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default AddTourType;