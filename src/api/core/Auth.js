import { SessionLocal } from './SessionLocal'

export class Auth {
  constructor () {
    this.session = new SessionLocal()
  }

  isLoggedIn () {
    return !!this.getToken()
  }

  login (user, token) {
    this.setUser(user)
    this.setToken(token)
  }

  logout () {
    this.removeToken()
    this.removeToken()
  }

  getUser () {
    return this.session.get('user')
  }

  getPermisos () {
    const grupos = this.getUser().groups
    const permisos = []
    const getPaths = ({ menus }) => {
      menus.forEach(menu => {
        permisos.push(menu.path)
        getPaths(menu)
      })
    }
    grupos.forEach(getPaths)
    return permisos.filter(p => p !== '')
  }

  canIntoPage (permiso) {
    return !!this.getPermisos().find(p => permiso === p)
  }

  setUser (user) {
    this.session.set('user', user)
  }

  getToken () {
    return this.session.get('token')
  }

  setToken (token) {
    const Bearer = 'Bearer ' + token
    this.session.set('token', Bearer)
  }

  removeToken () {
    this.session.del('token')
  }

  removeUser () {
    this.session.del('user')
  }
}
