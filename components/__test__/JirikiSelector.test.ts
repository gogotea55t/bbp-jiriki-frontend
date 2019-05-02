import { mount } from '@vue/test-utils'
import * as JirikiSelector from '../JirikiSelector.vue'

describe(JirikiSelector.default, () => {
  const wrapper = mount(JirikiSelector.default)
  it('プルダウンが存在する', () => {
    expect(wrapper.find('#jiriki-selector').isVisible)
  })
  it('選択を切り替えることができる', () => {
    wrapper.find('#jiriki-selector').setValue('地力Ｂ＋')
    expect(wrapper.vm.$data.jirikiRankSelected).toBe('地力Ｂ＋')
  })
})
