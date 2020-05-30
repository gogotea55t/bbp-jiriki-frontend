import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as User from '../user.vue'
import { AuthServiceStub } from '../__stubs__/AuthServiceMock'
import Vuex from 'vuex'

describe(User.default, () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({
    state: {
      auth: {
        loginUserId: 'u018'
      }
    }
  })
  it('表示できる', () => {
    const wrapper = shallowMount(User.default, {
      mocks: {
        $auth: new AuthServiceStub()
      },
      localVue,
      store
    })
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
