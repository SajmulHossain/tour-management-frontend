import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import Tour from "../components/modules/tours/Tour";
import type { ITour } from "@/types";
import { LoaderCircleIcon } from "lucide-react";

const Tours = () => {
    const { data, isLoading } = useGetAllToursQuery(undefined);

  return (
    <section className="section">
      {isLoading ? (
        <div className="min-h-screen gird place-items-center">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-12">
          <div className="col-span-9 w-full">
            {data?.data?.map((tour: ITour) => (
              <Tour key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Tours;