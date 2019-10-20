import { shallowMount } from '@vue/test-utils'
import * as User from '../user.vue'
import { AuthServiceStub } from '../__stubs__/AuthServiceMock'

describe(User.default, () => {
  it('表示できる', () => {
    const wrapper = shallowMount(User.default, {
      mocks: {
        $auth: new AuthServiceStub()
      }
    })
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
