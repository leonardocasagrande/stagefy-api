/* eslint-disable no-console */
import { createConnection, getConnectionOptions } from 'typeorm';

getConnectionOptions()
  .then(async options => {
    await createConnection(options);
    const { app } = await import('@shared/infra/http/config/app');

    app.listen(process.env.APP_PORT, () => {
      console.log(
        `\nServer started on port ${process.env.APP_PORT}! \nDocumentation: ${
          process.env.APP_API_URL
            ? process.env.APP_API_URL
            : `http://localhost:${process.env.APP_PORT}`
        }/api-docs`,
      );
    });
  })
  .catch(console.error);
