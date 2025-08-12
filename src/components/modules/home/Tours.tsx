import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import Tour from "./Tour";
import type { ITour } from "@/types";

const Tours = () => {
    const { data } = useGetAllToursQuery(undefined);

  return (
    <section className="section">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
        {data?.data?.map((tour: ITour) => (
          <Tour key={tour._id} tour={tour} />
        ))}
      </div>
    </section>
  );
};

export default Tours;