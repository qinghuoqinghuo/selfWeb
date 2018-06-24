/**
 * Created by lyc on 17-12-14.
 */
/**
 * set localStorage or sessionStorage
 */
export const setStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  if (localStorage.getItem('remember') === 'true') {
    localStorage.setItem(name, content)
  } else {
    sessionStorage.setItem(name, content)
  }
}
/**
 * get localStorage or sessionStorage
 */
export const getStorage = name => {
  if (localStorage.getItem('remember') === 'true') {
    if (!name) return
    return localStorage.getItem(name)
  } else {
    if (!name) return
    return sessionStorage.getItem(name)
  }
}

/**
 * delete localStorage or sessionStorage
 */
export const removeStorage = name => {
  if (!name) return
  if (localStorage.getItem('remember') === 'true') {
    if (!name) return
    return localStorage.removeItem(name)
  } else {
    if (!name) return
    return sessionStorage.removeItem(name)
  }
}

/**
 * clear localStorage and sessionStorage
 */
export const clearAllStorage = () => {
  localStorage.clear()
  sessionStorage.clear()
}
