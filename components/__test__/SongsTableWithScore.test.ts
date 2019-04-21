import { mount } from '@vue/test-utils'
import * as SongTableWithScore from '../SongsTableWithScore.vue'

describe(SongTableWithScore.default, () => {
  it('表示できる', () => {
    const wrapper = mount(SongTableWithScore.default)
    expect(wrapper.isVueInstance).toBeTruthy
  })
})
