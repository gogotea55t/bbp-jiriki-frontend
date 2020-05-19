import { mount } from '@vue/test-utils'
import * as ScoreInfo from '../ScoreInfo.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const mock = new MockAdapter(axios)

mock.onGet(process.env.apiBaseUrl + '/v2/songs/33/top').reply(200, {
  top: [
    { userId: 'u004', userName: '妖怪1', score: 100 },
    { userId: 'u005', userName: '妖怪Ｂ', score: 100 }
  ],
  second: [{ userId: 'u002', userName: '人間', score: 93 }],
  third: []
})

describe(ScoreInfo.default, () => {
  it('renders Score detail style.', () => {
    const wrapper = mount(ScoreInfo.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('tooltipのオンオフを切り替えると切り替わる', done => {
    const wrapper = mount(ScoreInfo.default, {
      mocks: {
        mock
      },
      propsData: {
        songId: '33',
        score: 88,
        max: 99,
        average: 55.78
      }
    })

    const vueInstance: any = wrapper.vm
    vueInstance.changeTooltip(true)
    setTimeout(done2 => {
      expect(wrapper.vm.$data.isTooltipShow).toBeTruthy
      vueInstance.changeTooltip(false)
      setTimeout(done3 => {
        expect(wrapper.vm.$data.isTooltipShow).toBeFalsy
        done()
        done3
      }, 500)
      done2
    }, 500)
  })
})
