import { shallowMount, createLocalVue, createWrapper } from '@vue/test-utils'
import * as PlayerSelector from '../PlayerSelector.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

//global.Promise = jest.requireActual('Promise')
jest.setTimeout(20000)

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: {
      loginUserId: null
    }
  }
})

const mock = new MockAdapter(axios)
mock.onGet(process.env.apiBaseUrl + '/v1' + '/players').reply(200, [
  {
    userId: 'u001',
    userName: '妖怪1'
  },
  {
    userId: 'u002',
    userName: '妖怪2'
  }
])

describe(PlayerSelector.default, () => {
  it('プレイヤーが選択できる', () => {
    const wrapper = shallowMount(PlayerSelector.default, {
      mocks: {
        Promise,
        mock
      },
      localVue,
      store
    })
    expect(wrapper.isVueInstance).toBeTruthy
  })
})

describe(PlayerSelector.default, () => {
  it('サーバーからプレイヤーを取得する', done => {
    const wrapper = shallowMount(PlayerSelector.default, {
      mocks: {
        Promise,
        mock
      },
      localVue,
      store
    })

    // wrapper.vm.$nextTick(() => {
    //   expect(wrapper.vm.$data.players.length).toBe(2)
    //   done()
    // })

    setTimeout(done2 => {
      expect(wrapper.vm.$data.players.length).toBe(2)
      done2
      done()
    }, 5000)
  })

  it('プレイヤーを選択するとイベントが発火する', done => {
    const wrapper = shallowMount(PlayerSelector.default, {
      mocks: {
        Promise,
        mock
      },
      localVue,
      store
    })

    setTimeout(done2 => {
      wrapper.find('select').trigger('change')
      const event = wrapper.emitted()['player-selected']
      if (event) {
        expect(event[0]).toContain('average')
        done2
        done()
      } else {
        fail()
      }
    }, 5000)
  })
})

describe(PlayerSelector.default, () => {
  it('通信エラーが起きる', () => {
    const mockWhenNetWorkError = new MockAdapter(axios)
    mockWhenNetWorkError.onGet(process.env.apiBaseUrl + '/v1' + '/players')
      .networkError

    const wrapper = shallowMount(PlayerSelector.default, {
      mocks: {
        Promise,
        mockWhenNetWorkError
      },
      localVue,
      store
    })
    setTimeout(done => {
      expect(wrapper.vm).toThrowError
      done
    }, 5000)
  })
})

describe(PlayerSelector.default, () => {
  it('マウント後にstoreの値が変わるので初期値が変わる', done => {
    const wrapper = shallowMount(PlayerSelector.default, {
      mocks: {
        Promise,
        mock
      },
      localVue,
      store
    })

    expect(wrapper.vm.$data.playerId).toBe('average')
    //    expect(wrapper.vm.$data.defaultPlayerId).toBe('u001')
    setTimeout(done2 => {
      wrapper.vm.$store.state.auth.loginUserId = 'u003'
      //    expect(wrapper.vm.$data.defaultPlayerId).toBe('u003')
      Vue.nextTick(() => {
        expect(wrapper.vm.$data.playerId).toBe('u003')
      })
      done2
      done()
    }, 200)
  })
})

describe(PlayerSelector.default, () => {
  it('マウント後にstoreの値が変わるので初期値が変わる', () => {
    const store2 = new Vuex.Store({
      state: {
        auth: {
          loginUserId: 'u005'
        }
      }
    })

    const wrapper = shallowMount(PlayerSelector.default, {
      mocks: {
        Promise,
        mock
      },
      localVue,
      store: store2
    })

    expect(wrapper.vm.$data.playerId).toBe('u005')
  })

  it('PlayerOnlyモードがオン', () => {
    const store2 = new Vuex.Store({
      state: {
        auth: {}
      }
    })

    const wrapper = shallowMount(PlayerSelector.default, {
      mocks: {
        Promise,
        mock
      },
      propsData: {
        playerOnly: true
      },
      localVue,
      store: store2
    })

    expect(wrapper.vm.$data.playerId).toBe('u001')
  })
})
