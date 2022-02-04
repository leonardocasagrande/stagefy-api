import { container } from 'tsyringe';
import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from './models/IMailProvider';

container.registerSingleton<IMailProvider>('MailProvider', SESMailProvider);
