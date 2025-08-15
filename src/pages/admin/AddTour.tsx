import DatePickerForm from "@/components/DatePickerForm";
import DynamicInput from "@/components/DynamicInput";
import MultipleImageUpload from "@/components/MultiImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import type { IDivision, ITourType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatISO } from "date-fns";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const tourZodSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    location: z.string().min(1, "Location is required"),
    costFrom: z.number().min(1, "Cost is required"),
    startDate: z.union([
      z.date({ message: "Start date is required" }),
      z.string(),
    ]),
    endDate: z.union([
      z.date({ message: "Start date is required" }),
      z.string(),
    ]),
    departureLocation: z.string().min(1, "Departure location is required"),
    arrivalLocation: z.string().min(1, "Arrival location is required"),
    included: z.array(z.union([z.object({ value: z.string() }), z.string()])).min(1),
    excluded: z.array(z.union([z.object({ value: z.string() }), z.string()])).min(1),
    amenities: z.array(z.union([z.object({ value: z.string() }), z.string()])),
    tourPlan: z.array(z.union([z.object({ value: z.string() }), z.string()])),
    maxGuest: z.number().min(1, "Max guest is required"),
    minAge: z.number().min(1, "Minimum age is required"),
    division: z.string().min(1, "Division is required"),
    tourType: z.string().min(1, "Tour type is required"),
  })
  .refine((data) => data.startDate <= data.endDate, {
    error: "End date cannot less than start date",
    path: ["endDate"],
  });

export type TourZodType = z.infer<typeof tourZodSchema>;

const AddTour = () => {
    const [images, setImages] = useState<(File | FileMetadata)[] | []>([])
    
  const { data: division, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);
  const { data: tourType, isLoading: tourTypeLoading } =
    useGetTourTypeQuery(undefined);

  const form = useForm<TourZodType>({
    resolver: zodResolver(tourZodSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      costFrom: 0,
      startDate: new Date(),
      endDate: new Date(),
      tourType: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      amenities: [{ value: "" }],
      tourPlan: [{ value: "" }],
      maxGuest: 0,
      minAge: 0,
      division: "",
      departureLocation: "",
      arrivalLocation: "",
    },
  });

  const fieldArrays = {
    included: useFieldArray({ control: form.control, name: "included" }),
    excluded: useFieldArray({ control: form.control, name: "excluded" }),
    amenities: useFieldArray({ control: form.control, name: "amenities" }),
    tourPlan: useFieldArray({ control: form.control, name: "tourPlan" }),
  };

  const onsubmit = (data: TourZodType) => {
       data.startDate= formatISO(data.startDate)
       data.endDate = formatISO(data.endDate)
       data.amenities = !(data.amenities[0] as {value: string}).value ? [] : data.amenities.map(data => data);
       data.included = !(data.included[0] as {value: string}).value ? [] : data.included.map(data => data);
       data.excluded = !(data.excluded[0] as {value: string}).value ? [] : data.excluded.map(data => data);
       data.tourPlan = !(data.tourPlan[0] as {value: string}).value ? [] : data.excluded.map(data => data);

    console.log(data);
    console.log(images);
  };

  const commandArr: [[IDivision], [ITourType]] = [
    division || [],
    tourType || [],
  ];

  if (divisionLoading || tourTypeLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Add Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g, Sajek Tour" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row gap-4">
                {commandArr?.map((values, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={index === 0 ? "division" : "tourType"}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          {index === 0 ? "Division" : "Tour Type"}
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? values.find(
                                      (value) => value.name === field.value
                                    )?.name
                                  : `Select ${
                                      index === 0 ? "division" : "tour type"
                                    }`}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput
                                placeholder={`Search ${
                                  index === 0 ? "division" : "tour type"
                                }`}
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>
                                  No {index === 0 ? "division" : "tour type"}{" "}
                                  found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {values.map((value) => (
                                    <CommandItem
                                      value={value.name}
                                      key={value._id}
                                      onSelect={() => {
                                        form.setValue(
                                          index === 0 ? "division" : "tourType",
                                          value.name
                                        );
                                      }}
                                    >
                                      {value.name}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          value.name === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                {Array(2)
                  .fill(null)
                  .map((_, index) => (
                    <DatePickerForm key={index} form={form} index={index} />
                  ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  name="departureLocation"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Departure Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g, Mirsarai, Chattogram"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="arrivalLocation"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Arrival Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g, Mirsarai, Chattogram"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="maxGuest"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Max Guest</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g, 1200"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  name="location"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g, Mirsarai, Chattogram"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="minAge"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Min Age</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g, 5"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="costFrom"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g, 1200"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                {(
                  ["included", "excluded", "amenities", "tourPlan"] as const
                ).map((key) => (
                  <div key={key} className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </p>
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => fieldArrays[key].append({ value: "" })}
                      >
                        <Plus />
                      </Button>
                    </div>

                    <div className="mt-2 space-y-2">
                      {fieldArrays[key].fields.map((_, index) => (
                        <DynamicInput
                          key={index}
                          form={form}
                          index={index}
                          name={key}
                          remove={fieldArrays[key].remove}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  name="costFrom"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Textarea {...field}
                          placeholder="Tour Description"
                          className="flex-1"
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  <MultipleImageUpload onChange={setImages} />
                </div>
              </div>

              <Button type="submit">Add Tour</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AddTour;
