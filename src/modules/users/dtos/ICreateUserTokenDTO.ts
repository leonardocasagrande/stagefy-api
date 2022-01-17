export default interface ICreateUserTokenDTO {
  userId: string;
  refreshToken: string;
  refreshTokenExpirationDate: Date;
  accessTokenExpirationDate: Date;
}
