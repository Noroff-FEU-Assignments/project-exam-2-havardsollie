export const tokenKey = "accessToken";
export const userKey = "name";

export function saveTokenKey (accessToken) {
  saveToLocalStorage(tokenKey, accessToken);
}

export function fetchToken() {
  return getFromLocalStorage(tokenKey);
}

export function saveThisUser(name) {
  saveToLocalStorage(userKey, name);
}

export function getUsername() {
  const user = getFromLocalStorage(userKey);

  if(user) {
    return user.name;
  }
  return null;
}

function saveToLocalStorage (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  const value = localStorage.getItem(key);

  if(!value) {
    return [];
  }
  return JSON.parse(value);
}