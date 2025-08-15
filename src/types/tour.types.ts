import type { IDivision } from "./division.type";

export interface ITour {
  _id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  startDate: string;
  endDate: string;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  tourType: ITourType;
  division: IDivision;
  maxGuest: number;
  minAge: number;
  departureLocation: string;
  arrivalLocation: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface ITourType {
  _id: string;
  name: string;
}
