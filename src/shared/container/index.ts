import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository';
import LikesRepository from '@modules/events/infra/typeorm/repositories/LikesRepository';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ILikesRepository from '@modules/events/repositories/ILikesRepository';
import PasswordResetTokenRepository from '@modules/users/infra/typeorm/repositories/PasswordResetTokenRepository';
import ProfessionalsRepository from '@modules/users/infra/typeorm/repositories/ProfessionalsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import '@modules/users/providers';
import IPasswordResetTokenRepository from '@modules/users/repositories/IPasswordResetTokenRepository';
import IProfessionalsRepository from '@modules/users/repositories/IProfessionalsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';
import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPasswordResetTokenRepository>(
  'PasswordResetTokenRepository',
  PasswordResetTokenRepository,
);

container.registerSingleton<IProfessionalsRepository>(
  'ProfessionalsRepository',
  ProfessionalsRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);

container.registerSingleton<ILikesRepository>(
  'LikesRepository',
  LikesRepository,
);
