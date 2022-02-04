import { container } from 'tsyringe';
import AgoraTokenProvider from './implementations/AgoraTokenProvider';
import IVideoTokenProvider from './models/IVideoTokenProvider';

container.registerSingleton<IVideoTokenProvider>(
  'VideoTokenProvider',
  AgoraTokenProvider,
);
