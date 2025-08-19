/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import useRole from "@/hooks/useRole";
// import useRole from "@/hooks/useRole";
import Delete from "@/components/ui/Delete";
import { role as roles } from "@/constants/constants";
import {
  useGetAllToursQuery,
  useRemoveTourMutation,
} from "@/redux/features/tour/tour.api";
import { format } from "date-fns";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const TourDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetAllToursQuery({ _id: id });
  const [removeTour, { isLoading: isRemoving }] = useRemoveTourMutation();
  const { role, isLoading: roling } = useRole();
  const navigate = useNavigate();

  const handleRemoveTour = async () => {
    const toastId = toast.loading("Deleting Tour");

    try {
      await removeTour(id).unwrap();
      navigate(-1);
      toast.success("Tour removed successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to remove tour", { id: toastId });
    }
  };

  const {
    title,
    description,
    amenities,
    // tourType,
    startDate,
    //   slug,
    images,
    arrivalLocation,
    departureLocation,
    //   division,
    excluded,
    endDate,
    location,
    maxGuest,
    tourPlan,
    minAge,
    included,
    costFrom,
    _id,
  } = data?.data?.[0] || {};

  if (isLoading) {
    return <Loading />;
  }

  if(isError) {
    return <div>Error</div>
  }
  return (
    <section className="section">
      {/* Header */}
      <div className="flex justify-between items-center  mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <div className="flex gap-4 text-gray-600 mb-4">
            <span>📍 {location}</span>
            <span>💰 From ${costFrom}</span>
            <span>👥 Max {maxGuest} guests</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <Button asChild>
            <Link to={`/booking/${_id}`}>Book Now</Link>
          </Button>
          {!roling && role === roles.superAdmin && (
            <Delete
              project_name={title as string}
              type="Tour"
              onConfirm={handleRemoveTour}
              isPending={isRemoving}
            />
          )}
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Tour Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
          <div className="space-y-2">
            <p>
              <strong>Dates:</strong>{" "}
              {format(new Date(startDate ? startDate : new Date()), "PP")} -{" "}
              {format(new Date(endDate ? endDate : new Date()), "PP")}
              {/* {formatDistanceStrict(startDate || new Date(), endDate || new Date())} */}
            </p>
            <p>
              <strong>Departure:</strong> {departureLocation}
            </p>
            <p>
              <strong>Arrival:</strong> {arrivalLocation}
            </p>
            <p>{/* <strong>Division:</strong> {divisionData?.[0]?.name} */}</p>
            <p>{/* <strong>Tour Type:</strong> {tourType} */}</p>
            <p>
              <strong>Min Age:</strong> {minAge} years
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Amenities & Inclusions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {amenities?.length as number > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Amenities</h3>
            <ul className="space-y-1">
              {amenities?.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(included?.length as number) > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Included</h3>
            <ul className="space-y-1">
              {included?.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(excluded?.length as number) > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Excluded</h3>
            <ul className="space-y-1">
              {excluded?.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-red-500 mr-2">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tour Plan */}
      {(tourPlan?.length as number) > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Tour Plan</h3>
          <ol className="space-y-2">
            {tourPlan?.map((plan, index) => (
              <li key={index} className="flex">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  {index + 1}
                </span>
                {plan}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};

export default TourDetails;
