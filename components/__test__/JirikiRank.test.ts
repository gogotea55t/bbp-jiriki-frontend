import { mount } from '@vue/test-utils'
import * as JirikiRank from '../JirikiRank.vue'

describe(JirikiRank.default, () => {
  it('renders Jiriki rank.', () => {
    const wrapper = mount(JirikiRank.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
