import { env } from '../config/env';

export interface User {
  id: string;
  password?: string;
  idType?: string;
  refreshToken?: string;
}

export const accessSecret = env.ACCESS;
export const refreshSecret = env.REFRESH;
export const accessTokenLife = 600;
export const refreshTokenLife = 12000;
