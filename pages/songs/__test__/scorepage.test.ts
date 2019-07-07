import { shallowMount } from '@vue/test-utils'
import * as ScorePage from '../_id.vue'

describe(ScorePage.default, () => {
  it('サーバーからデータを取得できる', () => {
    const wrapper = shallowMount(ScorePage.default, {
      mocks: {
        $route: {
          params: {
            id: '200'
          }
        }
      }
    })

    expect(wrapper.vm.$data.id).toBe('200')
  })

  it('読み込みが完了するとページタイトルが切り替わる', () => {
    const wrapper = shallowMount(ScorePage.default, {
      mocks: {
        $route: {
          params: {
            id: '200'
          }
        }
      }
    })

    const vueInstance: any = wrapper.vm
    vueInstance.loaded('ミラクルペイント(タタナミ) / ピアノ①')
    expect(wrapper.vm.$data.songsIdentifier).toBe(
      'ミラクルペイント(タタナミ) / ピアノ①'
    )
  })
})
