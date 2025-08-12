import type { ComponentType } from "react";

export type { ILogin, ISendOTP, IVerifyOTP } from "./auth.type";
export type { ITour, ITourType, IDivision } from "./tour.types";

export interface IResponse<T> {
  statusCode: number;
  success: true;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "GUIDE";