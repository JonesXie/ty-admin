import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserKey = 'UserKey'
const STORAGE_KEY = 'Captcha'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getUser() {
  const data = Cookies.get(UserKey)
  if (data === 'undefined') return ''
  return data
}

export function setToken(token, time = 1) {
  return Cookies.set(TokenKey, token, {
    expires: time
  })
}

export function setUser(user, time = 1) {
  return Cookies.set(UserKey, user, {
    expires: time
  })
}

export function removeToken() {
  Cookies.remove(UserKey)
  Cookies.remove(TokenKey)
}

export function getStorage() {
  if (window.localStorage) return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
  else return JSON.parse(Cookies.get(STORAGE_KEY) || '{}')
}

export function setStorage(todos) {
  if (window.localStorage) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  else {Cookies.set(STORAGE_KEY, todos, {
    expires: 0.01
  })}
}
