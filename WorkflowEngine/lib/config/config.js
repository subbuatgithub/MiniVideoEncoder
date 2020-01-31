/*
 * Create and export configuration variables used by the API
 *
 */
const constants = require('./constants');

// Container for all environments
const environments = {};

environments.production = {
  httpPort: process.env.HTTP_PORT,
  httpAddress: process.env.HOST,
  envName: 'production',
  log: {
    level: process.env.LOG_LEVEL,
  },
  database: {
    url: process.env.STORAGE_HOST,
    name: 'workflow-db',
    connectRetry: 5, // seconds
  },
  workflow: {
    pollingInterval: 10, // Seconds
  },
  authprovider: {
    domain: process.env.AUTH_DOMAIN,
    secret: process.env.AUTH_SECRET
  }
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environment defined above,
// if not default to prodution
const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.production;

// export the module
module.exports = environmentToExport;