import { Separator } from "@/components/ui/separator";
import AddDivisionModal from "./AddDivisionModal";

const AddDivision = () => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl">Divison</h2>
        <AddDivisionModal />
      </div>
      <Separator className="mt-2" />
    </section>
  );
};

export default AddDivision;