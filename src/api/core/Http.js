import axios from 'axios'
import { Auth } from './Auth'
import { Notifications } from './Notifications'

export class Http {
  constructor () {
    this.http = axios
    this.session = new Auth()
    this.notifications = new Notifications()
    this.requestInterceptor = (config) => {
      if (
        config.headers.Authorization === null ||
        config.headers.Authorization === undefined ||
        config.headers.Authorization === ''
      ) {
        config.headers.Authorization = this.session.getToken()
      }
      config.headers['Access-Control-Allow-Origin'] = '*'
      return config
    }
  }

  get (url, config = { headers: {} }) {
    return this.http.get(url, this.requestInterceptor(config)).then(r => r.data)
      .catch(e => {
        this.notifications.error(e)
        throw new Error(e.message)
      })
  }

  post (url, data, config = { headers: {} }) {
    return this.http.post(url, data, this.requestInterceptor(config)).then(r => r.data)
      .catch(e => {
        this.notifications.error(e)
        throw new Error(e.message)
      })
  }

  put (url, data, config = { headers: {} }) {
    return this.http.put(url, data, this.requestInterceptor(config)).then(r => r.data)
      .catch(e => {
        this.notifications.error(e)
        throw new Error(e.message)
      })
  }

  del (url, config = { headers: {} }) {
    return this.http.delete(url, this.requestInterceptor(config)).then(r => r.data)
      .catch(e => {
        this.notifications.error(e)
        throw new Error(e.message)
      })
  }
}
