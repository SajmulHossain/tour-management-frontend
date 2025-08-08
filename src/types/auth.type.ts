export interface ISendOTP {
  email: string;
}

export interface IVerifyOTP {
  otp: string;
  email: string;
}

export interface ILogin {
    email: string;
    password: string;
}