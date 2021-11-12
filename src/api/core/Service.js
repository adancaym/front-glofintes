import { UrlEndpoint } from './UrlEndpoint'
import { Http } from './Http'
import { ServiceHtmlHelper } from './ServiceHtmlHelper'

export class Service extends ServiceHtmlHelper {
  constructor (endpoint) {
    super()
    this.endpoint = new UrlEndpoint(endpoint)
    this.http = new Http()
    this.fields = []
    this.createDto = {}
  }

  save (object, params, config) {
    if (object.id) {
      return this.update(object, params, config)
    } else {
      return this.create(object, params, config)
    }
  }

  create (object, params, config) {
    return this.http.post(this.endpoint.getUrlEndpointWithParams('/', params), object, config)
  }

  update (object, params, config) {
    return this.http.put(this.endpoint.getUrlEndpointWithParams('/' + object.id, params), object, config)
  }

  list (params) {
    return this.http.get(this.endpoint.getUrlEndpointWithParams('/', params))
  }

  options (params, filter) {
    if (filter) {
      return this.list(params).then(d => d.filter(filter).map(e => ({
        text: e.name,
        value: e.id
      })))
    } else {
      return this.list(params).then(d => d.map(e => ({
        text: e.name,
        value: e.id
      })))
    }
  }

  one (id, params) {
    return this.http.get(this.endpoint.getUrlEndpointWithParams('/' + id, params))
  }

  remove (id, params) {
    return new Promise((resolve, reject) => {
      this.http.notifications.confirm('¿Desea eliminar?', () => {
        return this.http.del(this.endpoint.getUrlEndpointWithParams('/' + id, params)).then(() => {
          resolve(true)
        }).catch(e => {
          reject(e.message)
        })
      }, () => {
        this.http.notifications.showText('Se ha cancelado')
        reject(false)
      })
    })
  }
}
