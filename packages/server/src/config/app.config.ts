export default () => ({
  port: parseInt(process.env.APP_PORT as string, 10) || 3333,
  environment: process.env.NODE_ENV,
  log: (process.env.APP_LOG || 'error').split(',')
});
