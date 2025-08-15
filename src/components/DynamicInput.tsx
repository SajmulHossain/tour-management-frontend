/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage
} from "./ui/form";
import { Input } from "./ui/input";

interface IProps {
  form: UseFormReturn<FieldValues, any, FieldValues>;
  index: number;
}

const DynamicInput = ({ form, index }: IProps) => {
  return (
    <FormField
      name={`included.${index}.value`}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription className="sr-only">
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DynamicInput;
