import { mount } from '@vue/test-utils'
import * as PlayerSelector from '../PlayerSelector.vue'

describe(PlayerSelector.default, () => {
  it('プレイヤーが選択できる', () => {
    const wrapper = mount(PlayerSelector.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
