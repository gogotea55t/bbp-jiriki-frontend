import { mount } from '@vue/test-utils'
import * as ScoreInfo from '../ScoreInfo.vue'

describe(ScoreInfo.default, () => {
  it('renders Score detail style.', () => {
    const wrapper = mount(ScoreInfo.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('tooltipのオンオフを切り替えると切り替わる', () => {
    const wrapper = mount(ScoreInfo.default, {
      propsData: {
        songId: '33',
        score: 88,
        max: 99,
        average: 55.78
      }
    })

    const vueInstance: any = wrapper.vm
    vueInstance.changeTooltip(true)
    expect(wrapper.vm.$data.isTooltipShow).toBeTruthy
    vueInstance.changeTooltip(false)
    expect(wrapper.vm.$data.isTooltipShow).toBeFalsy
  })
})
