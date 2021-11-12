export class SessionLocal {
  constructor () {
    this.storage = sessionStorage
  }

  set (key, value) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  get (key) {
    return JSON.parse(this.storage.getItem(key))
  }

  del (key) {
    this.storage.removeItem(key)
  }
}
