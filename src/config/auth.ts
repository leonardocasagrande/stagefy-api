export default {
  jwt: {
    secret_token: process.env.APP_SECRET_TOKEN || 'test',
    expires_in_token: '1d',
    expires_access_token_days: 1,
    expires_refresh_token_days: 30,
  },
};
