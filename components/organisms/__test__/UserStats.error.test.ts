import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as UserStats from '../UserStats.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Vuex from 'vuex'

describe(UserStats.default, () => {
  const mock = new MockAdapter(axios)
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const store = new Vuex.Store({
    state: {
      auth: {
        loginUserId: 'u029'
      }
    }
  })

  const store2 = new Vuex.Store({
    state: {
      auth: {
        loginUserId: 'u044'
      }
    }
  })

  mock
    .onGet(process.env.apiBaseUrl + '/v1/players/u029/stats')
    .reply(500, { message: 'Something is wrong!' })
  mock
    .onGet(process.env.apiBaseUrl + '/v1/players/u044/stats')
    .reply(200, { gold: 1, silver: 3, bronze: 2, blue: 2, gray: 1, none: 1 })

  mock
    .onGet(process.env.apiBaseUrl + '/v1/players/u044/stats/detail')
    .reply(500, { message: 'Something is wrong!' })

  it('ユーザー統計を見ようとしたらサーバーエラー', done => {
    const wrapper = shallowMount(UserStats.default, {
      mocks: {
        mock,
        $nuxt: {
          error: () => {}
        }
      },
      localVue,
      store
    })
    setTimeout(done2 => {
      done()
      done2
    }, 400)
  })

  it('地力ごとのユーザー統計を見ようとしたらサーバーエラー', done => {
    const wrapper = shallowMount(UserStats.default, {
      mocks: {
        mock,
        $nuxt: {
          error: () => {}
        }
      },
      localVue,
      store: store2
    })
    mock.resetHistory()
    const vueInstance: any = wrapper.vm
    vueInstance.toggleDetail()
    setTimeout(done2 => {
      done()
      done2
    }, 400)
  })
})
