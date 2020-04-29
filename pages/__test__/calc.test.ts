import { shallowMount } from '@vue/test-utils'
import * as Calc from '../calc.vue'
import Vue from 'vue'

describe(Calc.default, () => {
  it('得点の計算ができる', () => {
    const wrapper = shallowMount(Calc.default)

    expect(wrapper.find('#score-numeral-part').text()).toBe('100')
    expect(wrapper.find('#score-decimal-part').text()).toBe('00')
    expect(wrapper.find('#score-invalid-angry').isVisible).toBeFalsy
  })

  it('小数点が混ざると怒りの表現が出てくる', done => {
    const wrapper = shallowMount(Calc.default)
    wrapper.vm.$data.best = 32.22
    Vue.nextTick(() => {
      expect(wrapper.find('#score-invalid-angry').isVisible).toBeTruthy
      done()
    })
  })

  it('負の数が混ざると怒りの表現が出てくる', done => {
    const wrapper = shallowMount(Calc.default)
    wrapper.vm.$data.bad = -33
    Vue.nextTick(() => {
      expect(wrapper.find('#score-invalid-angry').isVisible).toBeTruthy
      done()
    })
  })

  it('合計ノーツが0のときは0点になる', done => {
    const wrapper = shallowMount(Calc.default)
    wrapper.vm.$data.best = 0
    Vue.nextTick(() => {
      expect(wrapper.find('#score-numeral-part').text()).toBe('0')
      expect(wrapper.find('#score-decimal-part').text()).toBe('00')
      done()
    })
  })
})
