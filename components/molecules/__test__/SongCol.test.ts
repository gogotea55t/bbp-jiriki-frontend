import { shallowMount } from '@vue/test-utils'
import * as SongCol from '../SongCol.vue'
import Songs from '../../types/Songs'

const sampleSong = new Songs(
  '001',
  '地力Ｓ＋',
  'カミサマネジマキ',
  'ミラ',
  'ロックオルガン'
)

describe(SongCol.default, () => {
  it('楽曲情報が表示できる', () => {
    const wrapper = shallowMount(SongCol.default, {
      propsData: {
        song: sampleSong
      }
    })

    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('クリックするとモーダル活性化イベントを発火する', () => {
    const wrapper = shallowMount(SongCol.default, {
      propsData: {
        song: sampleSong
      }
    })

    wrapper.trigger('click')
    expect(wrapper.vm.$emit('toggleModal', '001'))
  })
})
