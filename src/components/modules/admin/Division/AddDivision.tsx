/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Delete from "@/components/ui/Delete";
import { Separator } from "@/components/ui/separator";
import { useDeleteDivisionMutation, useGetDivisionQuery } from "@/redux/features/division/division.api";
import type { IDivision } from "@/types";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import AddDivisionModal from "./AddDivisionModal";

const AddDivision = () => {
  const { data } = useGetDivisionQuery(undefined);
  const [deleteDivision, {isLoading: isDeleting}] = useDeleteDivisionMutation();

  const handleDeleteDivision = async (id: string) => {
    const toastId = toast.loading("Deleting Division");
    try {
      await deleteDivision(id).unwrap();
      toast.success("Division deleted", { id: toastId })
    } catch (error: any) {
      toast.error(error?.message || "Division deleted", { id: toastId });
    }
  } 

  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">Divison</h2>
        <AddDivisionModal />
      </div>
      <Separator className="my-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.map((division: IDivision) => (
          <Card key={division._id}>
            <CardHeader className="grow">
              <CardTitle>{division.name}</CardTitle>
              {division?.description && (
                <CardDescription>{division.description}</CardDescription>
              )}
              <CardAction>
                <Delete
                  project_name={division.name}
                  onConfirm={() => handleDeleteDivision(division._id)}
                  isPending={isDeleting}
                  type="Division"
                  view={<Trash2Icon />}
                />
              </CardAction>
            </CardHeader>
            <CardContent>
              {division?.thumbnail && (
                <img
                  className="rounded-md w-full object-cover"
                  src={division.thumbnail}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AddDivision;
