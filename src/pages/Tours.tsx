import Loading from "@/components/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useGetAllToursQuery, useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import type { ITour } from "@/types";
import Tour from "../components/modules/tours/Tour";
import NoData from "@/components/NoData";
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
import { useState } from "react";

const Tours = () => {
    const [selectDivision, setSelectDivision] = useState<string | undefined>(undefined);
    
    const [selectTourType, setSelectTourType] = useState<string | undefined>(undefined);
    

    
  const { data, isLoading, isError } = useGetAllToursQuery({division: selectDivision, tourType: selectTourType});
  const { data: tourTypes, isLoading: tourTypeLoading } = useGetTourTypeQuery(undefined);
  const { data: divisions, isLoading:isDivisionLoading } = useGetDivisionQuery(undefined);

  return (
    <section className="section">
      <div className="grid grid-cols-12 gap-4 relative">
        <Card className="col-span-5 md:col-span-3 h-fit sticky top-6">
          <CardHeader>
            <CardTitle>Filter</CardTitle>
            <CardDescription>Filter your tour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isDivisionLoading ? (
              <Skeleton className="h-8" />
            ) : (
              <Select onValueChange={value => setSelectDivision(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter by division</SelectLabel>
                    {divisions?.map((division: {_id: string, name: string}) => (
                      <SelectItem key={division?._id} value={division?._id}>{division?.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            {tourTypeLoading ? (
              <Skeleton className="h-8" />
            ) : (
              <Select onValueChange={value => setSelectTourType(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a tour type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter by Tour Type</SelectLabel>
                    {tourTypes?.map((tourType: {_id: string, name: string}) => (
                      <SelectItem key={tourType?._id} value={tourType?._id}>{tourType?.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>
        <div className="col-span-7 md:col-span-9 w-full">
          {isLoading ? (
            <Loading />
          ) : !isLoading && !isError && !data?.length ? (
            <NoData />
          ) : (
            data?.map((tour: ITour) => <Tour key={tour._id} tour={tour} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Tours;
