/* eslint-disable no-console */
export const info = ( ...args ) =>
  console.info(
    "%c INFO LOG: ",
    "background: #0099ff; color: #fff;",
    ...args
  );
export const dev = ( ...args ) =>
  console.log(
    "%c DEV LOG: ",
    "background: #339933; color: #fff",
    ...args
  );
export const error = ( ...args ) =>
  console.error(
    "%c ERROR LOG: ",
    "background: #ff0000; color: #fff ",
    ...args
  );
export const logAPI = ( ...args ) =>
  console.info(
    "%c API LOG: ",
    "background: #222; color: #bada55",
    ...args
  );
export const apiError = ( ...args ) =>
  console.error(
    "%c API LOG: ",
    "background: #222; color: #bada55",
    ...args
  );
export const logRedux = ( ...args ) =>
  console.info(
    "%c REDUX LOG: ",
    "background: #6600cc; color: #fff;",
    ...args
  );

