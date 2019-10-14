import { EventEmitter } from 'events'

export class AuthServiceStub extends EventEmitter {
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      resolve()
      return 'token'
    })
  }

  profile = {
    name: 'mock',
    userid: 'mock',
    sub: 'mock',
    picture: process.env.BaseUrl + '/favicon.ico'
  }
}
