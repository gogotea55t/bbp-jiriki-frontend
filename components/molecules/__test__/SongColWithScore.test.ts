import { mount } from '@vue/test-utils'
import * as SongColWithScore from '../SongColWithScore.vue'
import SongsWithScore from '../../types/SongsWithScore'

describe(SongColWithScore.default, () => {
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

  it('正確に表示できる', () => {
    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('クリックするとモーダル発火イベントを起こす', () => {
    wrapper.trigger('click')
    expect(wrapper.emitted('toggleModal')[0][0]).toBe('57')
  })
})
