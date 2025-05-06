export interface JwtPayload {
  sub: number; // id пользователя
  email: string;
  role: string;
}
