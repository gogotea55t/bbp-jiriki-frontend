import { EventEmitter } from 'events'

export class AuthServiceStub extends EventEmitter {
  getTokenSilently() {
    return new Promise((resolve, reject) => {
      resolve(this.user)
      return 'token'
    })
  }

  user = {
    name: 'mock',
    userid: 'mock',
    sub: 'mock',
    picture: process.env.BaseUrl + '/favicon.ico'
  }
}
