export interface UserPayload {
  sub: number;
  email: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}
