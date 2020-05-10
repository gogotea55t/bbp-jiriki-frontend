import { mount } from '@vue/test-utils'
import * as ScoreInfo from '../ScoreInfo.vue'

describe(ScoreInfo.default, () => {
  it('renders Score detail style.', () => {
    const wrapper = mount(ScoreInfo.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
