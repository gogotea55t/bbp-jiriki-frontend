import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as TopsVue from '../Tops.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import Tops from '../../../components/types/Tops'
import PlayerScore from '../../../components/types/PlayerScore'

const mock = new MockAdapter(axios)
mock.onGet(process.env.apiBaseUrl + '/v2/songs/33/top').reply(200, {
  top: [
    { userId: 'u004', userName: '妖怪1', score: 100 },
    { userId: 'u005', userName: '妖怪Ｂ', score: 100 }
  ],
  second: [{ userId: 'u002', userName: '人間', score: 93 }],
  third: []
})

mock.onGet(process.env.apiBaseUrl + '/v2/songs/34/top').reply(500, {})
describe(TopsVue.default, () => {
  it('まずは表示できる', done => {
    const wrapper = shallowMount(TopsVue.default, {
      mocks: {
        mock,
        $nuxt: { error: () => {} }
      },
      propsData: {
        songId: '33'
      }
    })
    wrapper.setProps({ isToolTipShow: true, songId: '33' })
    const vueInstance: any = wrapper.vm
    vueInstance.loadInfo('33')
    setTimeout(done2 => {
      expect(wrapper.vm.$props.isToolTipShow).toBeTruthy
      expect(wrapper.vm.$data.tops).toBeTruthy
      done()
      done2
    }, 300)
  })

  it('エラーが起きたらエラーページに飛ぶ', done => {
    const wrapper = shallowMount(TopsVue.default, {
      mocks: {
        mock,
        $nuxt: { error: () => {} }
      },
      propsData: {
        songId: '34'
      }
    })
    wrapper.setProps({ isToolTipShow: true, songId: '34' })
    setTimeout(done2 => {
      const vueInstance: any = wrapper.vm
      expect(vueInstance.loadInfo('34')).toThrowError
      done()
      done2
    }, 500)
  })

  it('Topsの型に関するテスト', () => {
    const testTops: Tops = new Tops([], [], [])
    expect(testTops.empty()).toBe(true)

    const testTops2: Tops = new Tops(
      [
        new PlayerScore('u001', '妖怪A', 98),
        new PlayerScore('u005', '妖怪E', 98)
      ],
      [new PlayerScore('u003', '妖怪C', 97)],
      []
    )
    expect(testTops2.empty()).toBe(false)
  })
})
