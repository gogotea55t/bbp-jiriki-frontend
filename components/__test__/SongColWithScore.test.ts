import { mount } from '@vue/test-utils'
import * as SongColWithScore from '../SongColWithScore.vue'
import SongsWithScore from '../SongsWithScore'

describe(SongColWithScore.default, () => {
  it('正確に表示できる', () => {
    const sampleSongs: SongsWithScore = new SongsWithScore(
      '57',
      '地力Ｆ',
      'あれ',
      'それ',
      'シンセリード',
      76
    )

    const wrapper = mount(SongColWithScore.default, {
      propsData: {
        song: sampleSongs
      }
    })

    expect(wrapper.isVueInstance).toBeTruthy
  })
})
