interface EnvTypes {
    baseUrl: string;
}

export const envVars: EnvTypes = {
  baseUrl: import.meta.env.VITE_BASE_URL,
};