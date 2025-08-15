/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SinglePhotoUpload from '@/components/SinglePhotoUpload';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";

const AddDivisionZodSchema = z.object({
    name: z.string().min(1, {error: "Division Name is Required"}),
    description: z.string().optional()
})

const AddDivisionModal = () => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const [addDivision, { isLoading }] = useAddDivisionMutation();
   
    const form = useForm({
        resolver: zodResolver(AddDivisionZodSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof AddDivisionZodSchema>)=> {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("file", image as File);

        const toastId = toast.loading("Adding Division");

        try {
          await addDivision(formData).unwrap();
          toast.success("Division Added", { id: toastId });
          setOpen(false);
        } catch (error: any) {
          toast.error(error?.data?.message || "Failed to upload Division", {id: toastId});
        }
    }
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Add Division</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Division</DialogTitle>
            <DialogDescription>
              Add a division to specify more to travellers
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="add-division-form"
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g, Chattogram" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g, Chattogram" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>

            <SinglePhotoUpload onChange={setImage} />
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-division-form" disabled={isLoading}>
              Add Division
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddDivisionModal;
