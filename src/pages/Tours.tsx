import Loading from "@/components/Loading";
import ToursFilter from "@/components/modules/tours/ToursFilter";
import NoData from "@/components/NoData";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import type { ITour } from "@/types";
import { useSearchParams } from "react-router";
import Tour from "../components/modules/tours/Tour";
import PaginationComponent from "@/components/Pagination";
import { useState } from "react";

const Tours = () => {
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(1);

     const division = searchParams.get("division") || undefined;
     const tourType = searchParams.get("tourType") || undefined;
    
     const { data, isLoading, isError } = useGetAllToursQuery({division, tourType, limit: 1, page: currentPage});

  return (
    <section className="section">
      <div className="grid grid-cols-12 gap-4 relative">
        <ToursFilter />
        <div className="col-span-7 md:col-span-9 w-full">
          {isLoading ? (
            <Loading />
          ) : !isLoading && !isError && !data?.data?.length ? (
            <NoData />
          ) : (
            data?.data?.map((tour: ITour) => (
              <Tour key={tour._id} tour={tour} />
            ))
          )}
          <PaginationComponent onPageChange={setCurrentPage} page={data?.meta?.totalPage || 0} />
        </div>
      </div>
    </section>
  );
};

export default Tours;