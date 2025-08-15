import type {
  FieldValues,
  Path,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Minus } from "lucide-react";
import { Button } from "./ui/button";

interface IProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  index: number;
  remove: UseFieldArrayRemove;
  name: Path<T>;
}

const DynamicInput = <T extends FieldValues>({
  form,
  index,
  remove,
  name,
}: IProps<T>) => {
  return (
    <FormField
      name={`${name}.${index}.value` as Path<T>}
      control={form.control}
      render={({ field }) => (
        <FormItem className="relative">
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription className="sr-only">
            This is your public display name.
          </FormDescription>
          <FormMessage />
          <Button
            type="button"
            className="absolute right-0"
            size={"icon"}
            variant={"destructive"}
            onClick={() => remove(index)}
          >
            <Minus />
          </Button>
        </FormItem>
      )}
    />
  );
};

export default DynamicInput;
