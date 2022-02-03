interface IMailConfig {
  awsRegion: string;

  defaults: {
    from: { email: string; name: string };
  };
}

export default {
  awsRegion: process.env.AWS_DEFAULT_REGION,

  defaults: {
    from: {
      email: process.env.MAIL_ADRESS,
      name: process.env.NAME,
    },
  },
} as IMailConfig;
