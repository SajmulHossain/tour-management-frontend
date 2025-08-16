import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import Tour from "../components/modules/tours/Tour";
import type { ITour } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/Loading";

const Tours = () => {
  const { data, isLoading } = useGetAllToursQuery(undefined);

  return (
    <section className="section">
      <div className="grid grid-cols-12 gap-4 relative">
        <Card className="col-span-5 md:col-span-3 h-fit sticky top-0">
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
          ) : (
            data?.map((tour: ITour) => (
              <Tour key={tour._id} tour={tour} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Tours;
