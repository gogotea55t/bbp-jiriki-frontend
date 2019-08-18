import { shallowMount } from '@vue/test-utils'
import * as Callback from '../callback.vue'
import { AuthServiceStub } from '../__stubs__/AuthServiceMock'

const mockRouter = {
  push: jest.fn()
}

describe(Callback.default, () => {
  it('表示できる', () => {
    const wrapper = shallowMount(Callback.default, {
      mocks: {
        $auth: new AuthServiceStub()
      }
    })
    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('ログインイベント発生', () => {
    const wrapper = shallowMount(Callback.default, {
      mocks: {
        $auth: new AuthServiceStub(),
        $router: mockRouter
      }
    })

    const vueInstance: any = wrapper.vm
    vueInstance.handleLoginEvent({
      loggedIn: true,
      profile: {},
      state: {}
    })
  })
})
