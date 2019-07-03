import { shallowMount } from '@vue/test-utils'
import * as SongInfoModal from '../SongInfoModal.vue'

describe(SongInfoModal.default, () => {
  const wrapper = shallowMount(SongInfoModal.default, {
    propsData: {
      id: '001'
    }
  })
  const vueInstance: any = wrapper.vm
  it('モーダル表示命令が飛ぶとモーダル表示する', () => {
    vueInstance.toggleModal('002')
    expect(wrapper.vm.$data.modalSongId).toBe('002')
    expect(wrapper.classes()).toContain('is-active')
  })

  it('モーダルとじ命令が飛ぶとモーダルが閉じる', () => {
    vueInstance.untoggleModal()
    expect(wrapper.classes()).not.toContain('is-active')
  })
})
