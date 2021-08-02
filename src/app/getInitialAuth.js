const getInitialAuth = () => {
  const getAuthData = () => JSON.parse(localStorage.getItem('user'));
  return getAuthData();
};

export default getInitialAuth;
