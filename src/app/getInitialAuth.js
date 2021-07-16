export default () => {
  const getAuthData = () => JSON.parse(localStorage.getItem('user'));
  return getAuthData();
};
