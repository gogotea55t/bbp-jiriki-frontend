import { shallowMount } from '@vue/test-utils'
import * as PlayerLinkageModal from '../PlayerLinkageModal.vue'

jest.spyOn(window, 'alert').mockImplementation(() => {})

describe(PlayerLinkageModal.default, () => {
  const wrapper = shallowMount(PlayerLinkageModal.default, () => {})
  const vueInstance: any = wrapper.vm
  it('初期値ではモーダルは出ていない', () => {
    expect(wrapper.vm.$data.modal['is-active']).toBeFalsy()
  })

  it('モーダルを開けようとしたら開き、閉じようとしたら閉まる', () => {
    vueInstance.toggleModal()
    expect(wrapper.vm.$data.modal['is-active']).toBeTruthy()
    vueInstance.untoggleModal()
    expect(wrapper.vm.$data.modal['is-active']).toBeFalsy()
  })

  it('キャンセルボタンを押されたことを検知したらモーダルが閉じる', () => {
    vueInstance.cancel()
    expect(wrapper.vm.$data.modal['is-active']).toBeFalsy()
  })
})
