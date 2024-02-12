import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: string;
}

export const verifyToken = (token: string): JwtPayload => {
  return jwtDecode(token) as JwtPayload;
};
