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
  .onPut(apiBaseUrl + '/v1/players', {
    userId: 'u003',
    twitterUserId: 'mock'
  })
  .reply(201, { userId: 'u003', userName: '妖怪3' })

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
})
