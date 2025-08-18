import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";

const ToursFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedDivision = searchParams.get("division") || "";
    const selectedTourType = searchParams.get("tourType") || "";

      const { data: tourTypes, isLoading: tourTypeLoading } = useGetTourTypeQuery(undefined);
      const { data: divisions, isLoading:isDivisionLoading } = useGetDivisionQuery(undefined);
    
      const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("division");
        params.delete("tourType");
        setSearchParams(params);
      }

      const handleDivisionChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("division", value);
        setSearchParams(params);
    }
    
    const handleTourTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("tourType", value);
        setSearchParams(params);
      }
  return (
    <Card className="col-span-5 md:col-span-3 h-fit sticky top-6">
      <CardHeader>
        <CardTitle>Filter</CardTitle>
        <CardDescription>Filter your tour</CardDescription>
        <CardAction>
          <Button size={"sm"} variant={"outline"} onClick={handleClearFilter}>
            Clear
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {isDivisionLoading ? (
          <Skeleton className="h-8" />
        ) : (
          <Select value={selectedDivision} onValueChange={handleDivisionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a division" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter by division</SelectLabel>
                {divisions?.map((division: { _id: string; name: string }) => (
                  <SelectItem key={division?._id} value={division?._id}>
                    {division?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {tourTypeLoading ? (
          <Skeleton className="h-8" />
        ) : (
          <Select value={selectedTourType} onValueChange={handleTourTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tour type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter by Tour Type</SelectLabel>
                {tourTypes?.map((tourType: { _id: string; name: string }) => (
                  <SelectItem key={tourType?._id} value={tourType?._id}>
                    {tourType?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </CardContent>
    </Card>
  );
};

export default ToursFilter;