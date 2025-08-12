import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ITour } from "@/types";
import { format } from "date-fns";

const Tour = ({ tour }: { tour: ITour }) => {
  const { title, description, amenities, tourType, startDate } = tour || {};

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p>{tourType.name}</p>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border w-fit p-3 rounded-md">
            <h3 className="text-xl font-semibold">Amenities</h3>
            {amenities.map((amenitie, index) => (
              <div key={index}>{amenitie}</div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-between">
          <p>{format(startDate || new Date(), "PP")}</p>
          <CardAction>See More Details</CardAction>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Tour;
