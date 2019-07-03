import { shallowMount } from '@vue/test-utils'
import * as Songlist from '../songlist.vue'
import SongsTableStub from '../__stubs__/SongsTableStub.vue'
import SongInfoModalStub from '../__stubs__/SongInfoModalStub.vue'

describe(Songlist.default, () => {
  const wrapper = shallowMount(Songlist.default, {
    propsData: {
      query: '/songs?page='
    },
    stubs: {
      SongsTable: SongsTableStub,
      SongInfoModal: SongInfoModalStub
    }
  })

  it('とりあえず表示できる', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('さらに読み込みできる', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.getMore()
    expect(wrapper.vm.$data.query).toBe('/songs?page=')
    expect(wrapper.vm.$data.page).toBe(1)
  })

  it('検索をかけたうえでさらに読み込みする', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.search('name=RPG')
    expect(wrapper.vm.$data.page).toBe(0)
    vueInstance.getMore()
    expect(wrapper.vm.$data.query).toBe('/songs?name=RPG&page=')
    expect(wrapper.vm.$data.page).toBe(1)
  })

  it('スクロールしてみる', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.handleScroll()
  })

  it('モーダルが起動する', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.toggleModal('001')
  })
})
