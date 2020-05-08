import { mount } from '@vue/test-utils'
import * as ScoreDetailStyle from '../ScoreDetailStyle.vue'

describe(ScoreDetailStyle.default, () => {
  it('renders Score detail style.', () => {
    const wrapper = mount(ScoreDetailStyle.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
