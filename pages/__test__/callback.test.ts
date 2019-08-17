import { shallowMount } from '@vue/test-utils'
import * as Callback from '../callback.vue'
import { AuthServiceStub } from '../__stubs__/AuthServiceMock'

describe(Callback.default, () => {
  it('表示できる', () => {
    const wrapper = shallowMount(Callback.default, {
      mocks: {
        $auth: new AuthServiceStub()
      }
    })
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
