import { shallowMount } from '@vue/test-utils'
import * as ScorePage from '../_id.vue'

describe(ScorePage.default, () => {
  const wrapper = shallowMount(ScorePage.default, {
    mocks: {
      $route: {
        params: {
          id: '200'
        }
      }
    }
  })

  it('表示できる', () => {
    expect(wrapper.vm.$data.id).toBe('200')
  })
})
