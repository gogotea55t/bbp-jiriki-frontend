import { shallowMount } from '@vue/test-utils'
import * as ScoreStyle from '../ScoreStyle.vue'

describe(ScoreStyle.default, () => {
  it('90点以上の表示が銀色', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: 92
      }
    })
    expect(wrapper.vm.$data.classObject.manzokuSitenai).toBe(true)
  })

  it('100点の表示が金色', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: 100
      }
    })
    expect(wrapper.vm.$data.classObject.chousiniNorunja).toBe(true)
  })
})
