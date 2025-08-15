import { Separator } from "@/components/ui/separator";
import AddDivisionModal from "./AddDivisionModal";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import type { IDivision } from "@/types";

const AddDivision = () => {
  const { data } = useGetDivisionQuery(undefined);

  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">Divison</h2>
        <AddDivisionModal />
      </div>
      <Separator className="my-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.map((division: IDivision) => (
          <div key={division._id} className="border px-4 py-2 rounded-md">
            <h2 className="mb-3">{division.name}</h2>
            {
              division.thumbnail && <img className="rounded-md object-cover" src={division.thumbnail} alt={`${division.name} thumbnail`} />
            }
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddDivision;
