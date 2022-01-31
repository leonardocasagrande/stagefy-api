import IVideoTokenProvider from '../models/IVideoTokenProvider';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import agoraConfig from 'config/agora';

class AgoraTokenProvider implements IVideoTokenProvider {
  public generateToken(channelName: string, userId: string): string {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs =
      currentTimestamp + agoraConfig.expirationTimeInSeconds;
    if (!agoraConfig.appId) throw new Error('Agora APP Id is not set');
    if (!agoraConfig.certificate)
      throw new Error('Agora Certificate is not set');
    return RtcTokenBuilder.buildTokenWithAccount(
      agoraConfig.appId,
      agoraConfig.certificate,
      channelName,
      userId,
      RtcRole.PUBLISHER,
      privilegeExpiredTs,
    );
  }
}

export default AgoraTokenProvider;
