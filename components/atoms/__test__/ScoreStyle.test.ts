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

  it('undefinedでもエラーにならない', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: undefined
      }
    })
    expect(wrapper.vm.$data.classObject.masakaHonkija).toBe(true)
  })

  it('小数点モードがオンの時はちゃんと小数点第２位までで表記される', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: 76.5432,
        decimal: true
      }
    })
    expect(wrapper.vm.$data.classObject.chutoHampa).toBe(true)
    const vueInstance: any = wrapper.vm
    expect(vueInstance.scoreView).toBe('76.54')
  })

  it('小数点モードがオンかつundefinedでもエラーにならない', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: undefined,
        decimal: true
      }
    })
    expect(wrapper.vm.$data.classObject.masakaHonkija).toBe(true)
  })
})
