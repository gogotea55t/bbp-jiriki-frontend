import { shallowMount } from '@vue/test-utils'
import * as SongShareButton from '../SongShareButton.vue'

describe(SongShareButton.default, () => {
  const wrapper = shallowMount(SongShareButton.default, {})
  const vueInstance: any = wrapper.vm
  it('初期状態ではボタンが表示されない', () => {
    expect(vueInstance.buttonIsVisible).toBe(false)
  })

  it('楽曲IDと楽曲情報がそろえばボタンを表示する', () => {
    wrapper.setProps({
      songId: '200',
      songIdentifier: 'カミサマネジマキ(ミラ) / ロックオルガン'
    })

    expect(vueInstance.buttonIsVisible).toBe(true)
  })
})
