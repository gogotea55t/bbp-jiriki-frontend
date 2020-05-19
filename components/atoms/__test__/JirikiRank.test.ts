import { mount } from '@vue/test-utils'
import * as JirikiRank from '../JirikiRank.vue'

describe(JirikiRank.default, () => {
  it('renders Jiriki rank.', () => {
    const wrapper = mount(JirikiRank.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('watch for jiriki rank change', done => {
    // https://hsuzuki.hatenablog.com/entry/2019/08/01/171141
    const wrapper = mount(JirikiRank.default, {
      propsData: {
        jirikiRank: '地力Ｃ'
      }
    })
    wrapper.setProps({ jirikiRank: '地力Ｂ' })
    setTimeout(done2 => {
      expect(wrapper.find('.bn')).toBeTruthy
      done2
      done()
    }, 500)
  })
})
