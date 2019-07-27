import { shallowMount } from '@vue/test-utils'
import * as SongLoader from '../SongLoader.vue'

declare global {
  namespace NodeJS {
    interface Global {
      document: Document
      window: Window
      navigator: Navigator
    }
  }
}

describe(SongLoader.default, () => {
  it('スクロールする', () => {
    const wrapper = shallowMount(SongLoader.default, {
      propsData: {
        hasNextPageToLoad: true,
        isFetchOnProgress: false
      }
    })

    const vueInstance: any = wrapper.vm
    vueInstance.handleScroll()
  })

  it('もう読み込むページがない状態でスクロールする', () => {
    const wrapper = shallowMount(SongLoader.default, {
      propsData: {
        hasNextPageToLoad: false,
        isFetchOnProgress: false
      }
    })
    const vueInstance: any = wrapper.vm
    vueInstance.handleScroll()
  })

  it('読み込み中の一瞬のすきにスクロールする', () => {
    const wrapper = shallowMount(SongLoader.default, {
      propsData: {
        hasNextPageToLoad: true,
        isFetchOnProgress: true
      }
    })
    const vueInstance: any = wrapper.vm
    vueInstance.handleScroll()
  })

  it('読み込むものがない状態で読み込み中にスクロール※そんなものはない', () => {
    const wrapper = shallowMount(SongLoader.default, {
      propsData: {
        hasNextPageToLoad: false,
        isFetchOnProgress: true
      }
    })
    const vueInstance: any = wrapper.vm
    vueInstance.handleScroll()
  })
})
