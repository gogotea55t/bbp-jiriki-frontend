import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as UserStats from '../UserStats.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Vuex from 'vuex'
import StatsWithJiriki from '~/components/types/StatsWithJiriki'

describe(UserStats.default, () => {
  const mock = new MockAdapter(axios)
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const store = new Vuex.Store({
    state: {
      auth: {
        loginUserId: 'u015'
      }
    }
  })
  mock
    .onGet(process.env.apiBaseUrl + '/v1/players/u015/stats')
    .reply(200, { gold: 1, silver: 3, bronze: 2, blue: 2, gray: 1, none: 1 })
  mock
    .onGet(process.env.apiBaseUrl + '/v1/players/u015/stats/detail')
    .reply(200, {
      detail: [
        {
          stats: {
            gold: 0,
            silver: 4,
            bronze: 4,
            blue: 2,
            gray: 1,
            none: 9
          },
          jirikiRank: '地力Ｓ＋'
        },
        {
          stats: {
            gold: 0,
            silver: 0,
            bronze: 0,
            blue: 0,
            gray: 0,
            none: 6
          },
          jirikiRank: '地力Ｓ'
        }
      ]
    })

  const wrapper = shallowMount(UserStats.default, {
    mocks: { mock },
    localVue,
    store
  })

  it('初期状態では全体のグラフだけしか出ない', done => {
    setTimeout(done2 => {
      expect(wrapper.find('#user_stats_graph').isVisible()).toBeTruthy()
      expect(wrapper.find('#user_stats_detailed_graphs').exists()).toBeFalsy()
      done()
      done2
    }, 300)
  })

  it('地力別に表示するボタンを押すとサーバと通信して詳細情報を出す', done => {
    const vueInstance: any = wrapper.vm
    vueInstance.toggleDetail()
    setTimeout(done2 => {
      expect(wrapper.find('#user_stats_graph').isVisible()).toBeTruthy()
      expect(wrapper.vm.$data.showDetail).toBeTruthy()
      expect(
        wrapper.find('#user_stats_detailed_graphs').isVisible()
      ).toBeTruthy()
      done()
      done2
    }, 400)
  })
})
