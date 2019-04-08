import { mount } from '@vue/test-utils'
import * as Songlist from '../songlist.vue'

describe(Songlist.default, () => {
  const wrapper = mount(Songlist.default)

  it('とりあえず表示できる', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})
