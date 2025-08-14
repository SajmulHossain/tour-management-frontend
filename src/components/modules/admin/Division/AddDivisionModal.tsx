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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const AddDivisionZodSchema = z.object({
    name: z.string().min(1, {error: "Division Name is Required"}),
    description: z.string().optional()
})

const AddDivisionModal = () => {
    const [open, isOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(AddDivisionZodSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const onSubmit = (data: z.infer<typeof AddDivisionZodSchema>)=> {
        console.log(data);
    }
    
  return (
    <Dialog open={open} onOpenChange={isOpen}>
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
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-division-form">
              Add Division
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddDivisionModal;
