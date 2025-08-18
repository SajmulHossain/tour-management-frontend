import Loading from "@/components/Loading";
import ToursFilter from "@/components/modules/tours/ToursFilter";
import NoData from "@/components/NoData";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import type { ITour } from "@/types";
import { useState } from "react";
import Tour from "../components/modules/tours/Tour";

const Tours = () => {
    const [selectDivision, setSelectDivision] = useState<string | undefined>(undefined);
    
    const [selectTourType, setSelectTourType] = useState<string | undefined>(undefined);
    

    
  const { data, isLoading, isError } = useGetAllToursQuery({division: selectDivision, tourType: selectTourType});


  return (
    <section className="section">
      <div className="grid grid-cols-12 gap-4 relative">
        <ToursFilter />
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
