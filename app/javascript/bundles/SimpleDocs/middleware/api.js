import { camelizeKeys } from 'humps'
import ReactOnRails from 'react-on-rails'

// Fetches an API response
const callApi = (url, method, data) => {
  return fetch(url, {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': ReactOnRails.authenticityToken()
    },
    body: JSON.stringify(data)
  })
  .then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)

      return camelizedJson
    })
  )
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { types, url, method, data } = callAPI

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(url, method, data).then(
    response => next(actionWith({
      type: successType,
      data: response
    })),
    error => next(actionWith({
      type: failureType,
      error: error || 'Something bad happened'
    }))
  )
}
