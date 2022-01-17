import cors from 'cors';

const appDomain = process.env.APP_WEB_URL
  ? process.env.APP_WEB_URL.replace(/\./g, '\\.')
  : '';

const whiteList = new RegExp(`^https:\\/\\/(.*\\.)${appDomain}$`);

export const corsSetup = cors({
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'DEV') return callback(null, true);

    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (!whiteList.test(origin)) {
      const msg =
        'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
});
