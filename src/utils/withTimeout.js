const withTimeout = (timeout, response) => {
  // eslint-disable-next-line functional/no-let
  const called = !!response.status;
  console.log(called);
  return new Promise((resolve, reject) => {
    if (!called) reject(new Error('netWork Error'));
    else resolve(response);
  });
};
export default withTimeout;
