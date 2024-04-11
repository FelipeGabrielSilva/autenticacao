export interface UserPayload {
  sub: number;
  email: string;
  typeUser: number;
  iat?: number;
  exp?: number;
}
