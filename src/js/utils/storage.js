function setSessionStorage(key, value) {
    sessionStorage.setItem(key, value);
}

function getSessionStorage(key) {
    return sessionStorage.getItem(key);
}

function removeSessionStorage(key) {
    return sessionStorage.removeItem(key);
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorage(key) {
    return localStorage.getItem(key);
}

function removeLocalStorage(key) {
    return localStorage.removeItem(key);
}

export { setSessionStorage, getSessionStorage, setLocalStorage, getLocalStorage, removeSessionStorage, removeLocalStorage };