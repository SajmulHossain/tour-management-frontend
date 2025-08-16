import Loading from "@/components/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import type { ITour } from "@/types";
import Tour from "../components/modules/tours/Tour";
import NoData from "@/components/NoData";

const Tours = () => {
  const { data, isLoading, isError } = useGetAllToursQuery({ limit: 100 });

  return (
    <section className="section">
      <div className="grid grid-cols-12 gap-4 relative">
        <Card className="col-span-5 md:col-span-3 h-fit sticky top-6">
          <CardHeader>
            <CardTitle>Filter</CardTitle>
            <CardDescription>Filter your tour</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
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
