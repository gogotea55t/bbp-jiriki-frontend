import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as ScoreStyle from '../ScoreStyle.vue'
import Vue from 'vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: {
      loginUserId: 'u001'
    }
  }
})

describe(ScoreStyle.default, () => {
  it('90点以上の表示が銀色', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: 92,
        decimal: false
      },
      localVue,
      store
    })
    expect(wrapper.vm.$data.classObject.manzokuSitenai).toBe(true)
  })

  it('100点の表示が金色', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: 100,
        decimal: false
      },
      localVue,
      store
    })
    expect(wrapper.vm.$data.classObject.chousiniNorunja).toBe(true)
  })

  it('undefinedでもエラーにならない', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: undefined
      },
      localVue,
      store
    })
    expect(wrapper.vm.$data.classObject.masakaHonkija).toBe(true)
  })

  it('小数点モードがオンの時はちゃんと小数点第２位までで表記される', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: 76.5432,
        decimal: true
      },
      localVue,
      store
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
      },
      localVue,
      store
    })
    expect(wrapper.vm.$data.classObject.masakaHonkija).toBe(true)
  })

  it('88点から90点に更新されたら背景色が変わる', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: 88
      },
      localVue,
      store
    })
    expect(wrapper.vm.$data.classObject.masakaKonoteido).toBe(true)
    const vueInstance: any = wrapper.vm
    vueInstance.scoreSubmitted(90)
    Vue.nextTick(() => {
      expect(wrapper.vm.$data.classObject.masakaKonoteido).toBe(false)
      expect(wrapper.vm.$data.classObject.manzokuSitenai).toBe(true)
    })
  })

  it('スコア欄が空欄でもエラーにならない', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: '',
        edit: false
      },
      localVue,
      store
    })

    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('78点から80点に変わると色が変わる', () => {
    const wrapper = shallowMount(ScoreStyle.default, {
      propsData: {
        score: 78,
        edit: false
      },
      localVue,
      store
    })

    wrapper.setProps({
      score: 80
    })
    expect(wrapper.vm.$data.classObject.chutoHampa).toBe(true)
    Vue.nextTick(() => {
      expect(wrapper.vm.$data.classObject.chutoHampa).toBe(false)
      expect(wrapper.vm.$data.classObject.masakaKonoteido).toBe(true)
    })
  })
})
