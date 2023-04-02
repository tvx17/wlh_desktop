/*
 *
 * Copyright (c) 2022. Axel Springer SE - IT Services - Sales & Editorial Systems - Sales Service Operations
 * This source code may only be used in consultation with the Sales Service Operations department in the Sales & Editorial Content division.
 * Use outside Axel Springer SE - IT Services is not permitted.
 *
 */

export const sockets = {
  development: {
    https: false,
    url:   'localhost',
    port:  5000
  },
  production:  {
    https: false,
    url:   'deasitdco1553',
    port:  3450
  }
};

export const globals = {
  runMode: 'development',
  version: '0.0.1'
};
