import { Button } from "@/components/ui/button";
import type { ITour } from "@/types";
import { Link } from "react-router";

const Tour = ({ tour }: { tour: ITour }) => {
  const {
    title,
    description,
    amenities,
    tourType,
    startDate,
    slug,
    images,
    arrivalLocation,
    departureLocation,
    division,
    excluded,
    endDate,
    location,
    maxGuest,
    tourPlan,
    minAge,
    included,
    costFrom,
    _id,
  } = tour || {};
  console.log(tour);

  return (
    <div
      key={slug}
      className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex"
    >
      <div className="w-2/5 bg-red-500 flex-shrink-0">
        <img
          src={images[0]}
          alt={title}
          className="object-cover w-full h-full "
        />
      </div>
      <div className="p-6 flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-3">{description}</p>

        <div className="flex -center justify-between mb-3">
          <span className="text-xl font-bold text-primary">
            From ৳{costFrom?.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">
            Max {maxGuest} guests
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="font-medium">From:</span> {departureLocation}
          </div>
          <div>
            <span className="font-medium">To:</span> {arrivalLocation}
          </div>
          <div>
            <span className="font-medium">Duration:</span> {tourPlan.length}{" "}
            days
          </div>
          <div>
            <span className="font-medium">Min Age:</span> {minAge}+
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
              +{amenities.length - 3} more
            </span>
          )}
        </div>

        <Button asChild className="w-full">
          <Link to={`/tours/${_id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
   
}
export default Tour;
