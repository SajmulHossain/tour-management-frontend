import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import Tour from "./Tour";

const Tours = () => {
    const { data } = useGetAllToursQuery(undefined);
    console.log(data?.data);

  return (
    <section>
      {
        data?.data?.map(tour => <Tour key={tour._id} tour={tour} />)
      }
    </section>
  );
};

export default Tours;