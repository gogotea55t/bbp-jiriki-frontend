import { EventEmitter } from 'events'

export class AuthServiceStub extends EventEmitter {
  getTokenSilently() {
    return new Promise((resolve, reject) => {
      resolve()
      return 'token'
    })
  }

  setLogout() {
    this.isAuthenticated = !this.isAuthenticated
  }

  isAuthenticated: boolean = true

  user = {
    name: 'mock',
    userid: 'mock',
    sub: 'mock',
    picture: process.env.BaseUrl + '/favicon.ico'
  }
}
