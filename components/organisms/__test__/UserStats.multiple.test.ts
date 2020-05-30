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
        loginUserId: 'u018'
      }
    }
  })
  mock
    .onGet(process.env.apiBaseUrl + '/v1/players/u018/stats')
    .reply(200, { gold: 1, silver: 3, bronze: 2, blue: 2, gray: 1, none: 1 })
  mock
    .onGet(process.env.apiBaseUrl + '/v1/players/u018/stats/detail')
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

  it('地力別に表示するボタンを何度も押しても通信は1回だけ', done => {
    mock.resetHistory()
    const vueInstance: any = wrapper.vm
    wrapper.setData({
      showDetail: false,
      detailedStats: new Array<StatsWithJiriki>()
    })
    // 読み込みが終わる前にひたすらクリック連打
    vueInstance.toggleDetail()
    vueInstance.toggleDetail()
    vueInstance.toggleDetail()
    vueInstance.toggleDetail()
    vueInstance.toggleDetail()
    setTimeout(done2 => {
      // 読み込みがたぶん終わったであろうタイミングでもクリック連打
      vueInstance.toggleDetail()
      vueInstance.toggleDetail()
      done2
    }, 200)
    setTimeout(done2 => {
      expect(wrapper.vm.$data.showDetail).toBeTruthy()
      expect(
        wrapper.find('#user_stats_detailed_graphs').isVisible()
      ).toBeTruthy()
      expect(mock.history.get.length).toBeLessThan(2)
      done()
      done2
    }, 400)
  })
})
