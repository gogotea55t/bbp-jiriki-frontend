import { shallowMount } from '@vue/test-utils'
import * as Privacy from '../privacy.vue'

describe(Privacy.default, () => {
  it('表示に失敗しない', () => {
    const wrapper = shallowMount(Privacy.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
