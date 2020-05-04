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

  it('TAIL MISSはTOTAL NOTESに含まれない', done => {
    const wrapper = shallowMount(Calc.default)
    wrapper.vm.$data.best = 400
    wrapper.vm.$data.good = 300
    wrapper.vm.$data.bad = 200
    wrapper.vm.$data.miss = 100
    wrapper.vm.$data.tailMiss = 50

    setTimeout(() => {
      // https://github.com/vuejs/vue-test-utils/issues/79
      const form: any = wrapper.find('#total_notes').element
      expect(form.value).toContain(1000)
      done()
    }, 40)
  })

  it('予想TAIL MISSが正しく表示される', done => {
    const wrapper = shallowMount(Calc.default)
    wrapper.vm.$data.best = 400
    wrapper.vm.$data.good = 300
    wrapper.vm.$data.bad = 200
    wrapper.vm.$data.miss = 100
    wrapper.vm.$data.tailMiss = 50
    wrapper.find('#furtherOptionButton').trigger('click')
    wrapper.vm.$data.actualScore = 75
    setTimeout(() => {
      expect(wrapper.find('#estimated_min_tail_miss').text()).toBe('50')
      expect(wrapper.find('#estimated_max_tail_miss').text()).toBe('70')
      done()
    }, 50)
  })

  it('予想TAIL MISSは実際の点数欄が高すぎると0になる', done => {
    const wrapper = shallowMount(Calc.default)
    wrapper.vm.$data.best = 400
    wrapper.vm.$data.good = 300
    wrapper.vm.$data.bad = 200
    wrapper.vm.$data.miss = 100
    wrapper.vm.$data.tailMiss = 50
    wrapper.find('#furtherOptionButton').trigger('click')
    wrapper.vm.$data.actualScore = 89
    setTimeout(() => {
      expect(wrapper.find('#estimated_min_tail_miss').text()).toBe('0')
      expect(wrapper.find('#estimated_max_tail_miss').text()).toBe('0')
      done()
    }, 50)
  })

  it('目標GOOD数などが正しく表示される', done => {
    const wrapper = shallowMount(Calc.default)
    wrapper.vm.$data.best = 400
    wrapper.vm.$data.good = 300
    wrapper.vm.$data.bad = 200
    wrapper.vm.$data.miss = 100
    wrapper.vm.$data.tailMiss = 50
    wrapper.find('#furtherOptionButton').trigger('click')
    wrapper.vm.$data.goalScore = 77
    setTimeout(() => {
      expect(wrapper.find('#good_for_goal').text()).toBe('67')
      expect(wrapper.find('#bad_for_goal').text()).toBe('29')
      expect(wrapper.find('#miss_for_goal').text()).toBe('11')
      done()
    }, 50)
  })

  it('目標スコアが低すぎるときは目標GOODなどが0になる', done => {
    const wrapper = shallowMount(Calc.default)
    wrapper.vm.$data.best = 400
    wrapper.vm.$data.good = 300
    wrapper.vm.$data.bad = 200
    wrapper.vm.$data.miss = 100
    wrapper.vm.$data.tailMiss = 50
    wrapper.find('#furtherOptionButton').trigger('click')
    wrapper.vm.$data.goalScore = 75
    setTimeout(() => {
      expect(wrapper.find('#good_for_goal').text()).toBe('0')
      expect(wrapper.find('#bad_for_goal').text()).toBe('0')
      expect(wrapper.find('#miss_for_goal').text()).toBe('0')
      done()
    }, 50)
  })
})
