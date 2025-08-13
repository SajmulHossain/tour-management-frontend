/* eslint-disable @typescript-eslint/no-explicit-any */
import AddTourModal from "@/components/modules/admin/tour/AddTourModal";
import Delete from "@/components/ui/Delete";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypeQuery, useRemoveTourTypeMutation } from "@/redux/features/tour/tour.api";
import { toast } from "sonner";

const AddTourType = () => {
    const {data} = useGetTourTypeQuery(undefined);
    const [removeTourType, { isLoading: isDeletingTourType }] = useRemoveTourTypeMutation();

    const handleRemoveTourType = async (id: string) => {
      const toastId = toast.loading("Removing Tour Type");
      try {
        await removeTourType(id).unwrap();
        toast.success("Tour type removed", { id: toastId })
      } catch (error: any) {
        toast.error(error.message || "Failed to remove tour type", { id: toastId });
      }
    }
    
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
          {data?.map((tourType: { _id: string; name: string }) => (
            <TableRow key={tourType._id}>
              <TableCell className="font-medium">{tourType.name}</TableCell>
              <TableCell className="text-right">
                <Delete
                  type="tour type"
                  project_name={tourType.name}
                  onConfirm={() => handleRemoveTourType(tourType._id)}
                  isPending={isDeletingTourType}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default AddTourType;