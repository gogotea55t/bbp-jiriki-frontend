import { shallowMount } from '@vue/test-utils'
import * as User from '../user.vue'
import { AuthServiceStub } from '../__stubs__/AuthServiceMock'
import Vue from 'vue'

describe(User.default, () => {
  it('ログイン状態なので正常に表示できる', () => {
    const wrapper = shallowMount(User.default, {
      mocks: {
        $auth: new AuthServiceStub()
      }
    })
    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('ログインなし状態で表示するとホームに飛ばされる', done => {
    const $router = { push: jest.fn() }
    const notLoggedIn: AuthServiceStub = new AuthServiceStub()
    notLoggedIn.setLogout()
    const wrapper = shallowMount(User.default, {
      mocks: {
        $auth: notLoggedIn,
        $router
      }
    })
    // expect(wrapper.vm.$auth.isAuthenticated).toBe(false)
    setTimeout(done2 => {
      expect($router.push).toHaveBeenCalledWith('/')
      done2
      done()
    }, 2000)
  })
})
