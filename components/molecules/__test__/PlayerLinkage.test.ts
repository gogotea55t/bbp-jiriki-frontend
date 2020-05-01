import { shallowMount } from '@vue/test-utils'
import * as PlayerLinkage from '../PlayerLinkage.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { AuthServiceStub } from '../../../pages/__stubs__/AuthServiceMock'

jest.setTimeout(20000)
jest.spyOn(window, 'alert').mockImplementation(() => {})
const mock = new MockAdapter(axios)
const apiBaseUrl: any = process.env.apiBaseUrl //|| 'http://localhost:8080'

mock
  .onPut(apiBaseUrl + '/v1/players/auth0', {
    userId: 'u003',
    twitterUserId: 'mock'
  })
  .reply(201, { userId: 'u003', userName: '妖怪3' })

mock
  .onPut(apiBaseUrl + '/v1/players/auth0', {
    userId: 'u004',
    twitterUserId: 'mock'
  })
  .reply(500)

mock
  .onPut(apiBaseUrl + '/v1/players/auth0', {
    userId: 'u005',
    twitterUserId: 'mock'
  })
  .reply(401, {
    message: 'ログインしているアカウントの連携情報のみ管理できます。'
  })

describe(PlayerLinkage.default, () => {
  it('登録できる', () => {
    const wrapper = shallowMount(PlayerLinkage.default, {
      mocks: {
        $auth: new AuthServiceStub(),
        $router: {
          push: () => {}
        },
        mock
      }
    })

    const vueInstance: any = wrapper.vm
    vueInstance.selectChanged('u003')
    expect(vueInstance.$data.playerId).toBe('u003')

    vueInstance.linkage()
  })

  it('登録しようとしたらサーバーエラー', () => {
    const wrapper = shallowMount(PlayerLinkage.default, {
      mocks: {
        $auth: new AuthServiceStub(),
        $router: {
          push: () => {}
        },
        mock
      }
    })

    const vueInstance: any = wrapper.vm
    vueInstance.selectChanged('u004')
    try {
      vueInstance.linkage()
    } catch (error) {
      expect(error.status).toBe(500)
    }
  })

  it('登録しようとしたらトークンの値がおかしい', () => {
    const wrapper = shallowMount(PlayerLinkage.default, {
      mocks: {
        $auth: new AuthServiceStub(),
        $router: {
          push: () => {}
        },
        mock
      }
    })
    const vueInstance: any = wrapper.vm
    vueInstance.selectChanged('u005')
    try {
      vueInstance.linkage()
    } catch (error) {
      expect(error.status).toBe(401)
    }
  })
})
