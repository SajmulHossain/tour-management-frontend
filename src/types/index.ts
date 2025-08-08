export type { ISendOTP, ILogin, IVerifyOTP } from "./auth.type";

export interface IResponse<T> {
    statusCode: number;
    success: true;
    message: string;
    data: T
}