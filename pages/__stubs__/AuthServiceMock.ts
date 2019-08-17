import { EventEmitter } from 'events'

export class AuthServiceStub extends EventEmitter {
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  profile = {
    name: 'mock',
    userid: 'mock',
    picture: process.env.BaseUrl + '/favicon.ico'
  }
}
