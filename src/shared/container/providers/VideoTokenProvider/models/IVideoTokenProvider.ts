export default interface IVideoTokenProvider {
  generateToken(channelName: string, userId: string): string;
}
