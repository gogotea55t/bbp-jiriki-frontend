import { EventEmitter } from 'events'

export class AuthServiceStub extends EventEmitter {
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
}
