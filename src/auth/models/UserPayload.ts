export interface UserPayload {
  sub: number;
  email: string;
  senha: string;
  iat?: number;
  exp?: number;
}
