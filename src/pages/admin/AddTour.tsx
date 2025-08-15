import DatePickerForm from "@/components/DatePickerForm";
import DynamicInput from "@/components/DynamicInput";
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
import { cn } from "@/lib/utils";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import type { IDivision, ITourType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const tourZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  costFrom: z.number().min(1, "Cost is required"),
  startDate: z.date({ message: "Start date is required" }),
  endDate: z.date({ message: "End date is required" }),
  departureLocation: z.string().min(1, "Departure location is required"),
  arrivalLocation: z.string().min(1, "Arrival location is required"),
  included: z.array(z.object({ value: z.string() })).min(1),
  excluded: z.array(z.object({ value: z.string() })).min(1),
  amenities: z.array(z.object({ value: z.string() })),
  tourPlan: z.array(z.object({ value: z.string() })),
  maxGuest: z.number().min(1, "Max guest is required"),
  minAge: z.number().min(1, "Minimum age is required"),
  division: z.string().min(1, "Division is required"),
  tourType: z.string().min(1, "Tour type is required"),
});

export type TourZodType = z.infer<typeof tourZodSchema>

const AddTour = () => {
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
      included: [],
      excluded: [],
      amenities: [],
      tourPlan: [],
      maxGuest: 0,
      minAge: 0,
      division: "",
      departureLocation: "",
      arrivalLocation: "",
    },
  });

  const {
    append: appendInclude,
    fields: fieldsInclude,
    remove: removeInclude,
  } = useFieldArray({ control: form.control, name: "included" });

  const {
    append: appendExcluded,
    fields: fieldsExcluded,
    remove: removeExcluded,
  } = useFieldArray({ control: form.control, name: "excluded" });

  const onsubmit = (data: TourZodType) => {
    console.log(data);
  };

  const commandArr: [[IDivision], [ITourType]] = [division, tourType];

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

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Included</p>
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => appendInclude({value: ""})}
                    >
                      <Plus />
                    </Button>
                  </div>

                  <div className="mt-2 space-y-2">
                    {fieldsInclude?.map((_, index) => (
                      <DynamicInput
                        key={index}
                        form={form}
                        index={index}
                        name="included"
                        remove={removeInclude}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Exclude</p>
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => appendExcluded({ value: "" })}
                    >
                      <Plus />
                    </Button>
                  </div>

                  <div className="mt-2 space-y-2">
                    {fieldsExcluded?.map((_, index) => (
                      <DynamicInput
                        key={index}
                        form={form}
                        index={index}
                        remove={removeExcluded}
                        name="excluded"
                      />
                    ))}
                  </div>
                </div>
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
                          type="number"
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
                          type="number"
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
