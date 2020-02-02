import { shallowMount } from '@vue/test-utils'
import * as LoginButton from '../LoginButton.vue'

describe(LoginButton.default, () => {
  it('表示できる', () => {
    const wrapper = shallowMount(LoginButton.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
