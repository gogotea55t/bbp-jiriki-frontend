import { mount } from '@vue/test-utils'
import * as Player from '../player.vue'

describe(Player.default, () => {
  const wrapper = mount(Player.default)

  it('とりあえず表示できる', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})
