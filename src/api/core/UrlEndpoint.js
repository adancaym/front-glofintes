export class UrlEndpoint {
  constructor (endpoint) {
    this.backendUrl = process.env.VUE_APP_API_BASE_URL
    this.backendApiUrl = process.env.VUE_APP_BACK_API_BASE_URL
    this.endpoint = endpoint
  }

  getUrlEndpoint () {
    return this.backendApiUrl + this.endpoint
  }

  getUrlEndpointWithParams (uri, params) {
    let url = this.getUrlEndpoint() + uri
    if (params) {
      const parameters = new URLSearchParams(params)
      url += '?'
      url += parameters.toString()
    }
    return url.toString()
  }
}
