import { shallowMount } from '@vue/test-utils'
import * as SongCol from '../SongCol.vue'
import Songs from '../Songs'

describe(SongCol.default, () => {
  it('楽曲情報が表示できる', () => {
    const sampleSong = new Songs(
      '001',
      '地力Ｓ＋',
      'カミサマネジマキ',
      'ミラ',
      'ロックオルガン'
    )
    const wrapper = shallowMount(SongCol.default, {
      propsData: {
        song: sampleSong
      }
    })

    expect(wrapper.isVueInstance).toBeTruthy
  })
})
