import { container } from 'tsyringe';
import DateFnsDateProvider from './implementations/DateFnsDateProvider';
import IDateProvider from './models/IDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DateFnsDateProvider);
