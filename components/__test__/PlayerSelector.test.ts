import { shallowMount } from '@vue/test-utils'
import * as PlayerSelector from '../PlayerSelector.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

//global.Promise = jest.requireActual('Promise')
jest.setTimeout(20000)

const mock = new MockAdapter(axios)
mock.onGet(process.env.apiBaseUrl + '/players').reply(200, [
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
      }
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
      }
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
      }
    })

    setTimeout(done2 => {
      wrapper.find('select').trigger('change')
      expect(wrapper.emitted()['player-selected'][0]).toContain('u001')
      done2
      done()
    }, 5000)
  })
})
