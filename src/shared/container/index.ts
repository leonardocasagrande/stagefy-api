import ProfessionalsRepository from '@modules/users/infra/typeorm/repositories/ProfessionalsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import '@modules/users/providers';
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

container.registerSingleton<IProfessionalsRepository>(
  'ProfessionalsRepository',
  ProfessionalsRepository,
);
