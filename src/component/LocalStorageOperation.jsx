export const getLocalStorageData = () => {
  return JSON.parse(localStorage.getItem("users"));
};
export const setLocalStorageData = (data) => {
  return localStorage.setItem("users", JSON.stringify(data));
};
export const setSessionStorageEmail = (email) => {
  return sessionStorage.setItem("email", email);
};
export const setSessionStorageIsLoggedIn = () => {
  return sessionStorage.setItem("isLoggedIn", true);
};
export const removeSessionStorage = (removeItem) => {
  return sessionStorage.removeItem(removeItem);
};
export const getSessionStorageData = (item) => {
  return sessionStorage.getItem(item);
};
