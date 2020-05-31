import { shallowMount } from '@vue/test-utils'
import * as ScorePieChart from '../ScorePieChart.vue'
import Stats from '../../types/Stats'

describe(ScorePieChart.default, () => {
  const wrapper = shallowMount(ScorePieChart.default, {
    propsData: {
      header: '地力Ａ',
      stats: new Stats(10, 3, 4, 5, 6, 7),
      showNone: false
    }
  })
  it('未プレイのものも含めずグラフを表示できる', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
    expect(wrapper.text()).toContain('地力Ａ')
  })

  it('未プレイのものを含めない設定から未プレイのものを含める設定に切り替えることができる', () => {
    wrapper.setProps({ showNone: true })
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('Propsに登録したスコアの変化には気づいてグラフを再レンダリングする', () => {
    wrapper.setProps({ stats: new Stats(1, 2, 3, 4, 5, 6) })
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('登録が0の時はグラフを表示しない', done => {
    wrapper.setProps({ stats: new Stats(0, 0, 0, 0, 0, 0) })
    expect(wrapper.isVueInstance).toBeTruthy()
    setTimeout(done2 => {
      expect(wrapper.text()).toContain('1曲も登録されていません')
      done()
      done2
    }, 500)
  })
})
