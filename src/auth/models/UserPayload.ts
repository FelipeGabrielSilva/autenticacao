export interface UserPayload {
  sub: number;
  email: string;
  typeUser: string;
  iat?: number;
  exp?: number;
}
