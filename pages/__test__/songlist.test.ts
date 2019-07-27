import { shallowMount } from '@vue/test-utils'
import * as Songlist from '../songlist.vue'
import SongsTableStub from '../__stubs__/SongsTableStub.vue'
import SongInfoModalStub from '../__stubs__/SongInfoModalStub.vue'
jest.setTimeout(20000)
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

  it('さらに読み込みできる', done => {
    const vueInstance: any = wrapper.vm
    vueInstance.getMore()
    vueInstance.getMore()
    setTimeout(done2 => {
      expect(wrapper.vm.$data.isFetchOnProgress).toBeFalsy
      expect(wrapper.vm.$data.hasNextPageToLoad).toBeTruthy
      expect(wrapper.vm.$data.query).toBe('/songs?page=')
      expect(wrapper.vm.$data.page).toBe(2)
      done2
      done()
    }, 5000)
  })

  it('検索をかけたうえでさらに読み込みする', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.search('name=RPG')
    expect(wrapper.vm.$data.page).toBe(0)
    vueInstance.getMore()
    // wrapper.vm.$emit('load-more')
    expect(wrapper.vm.$data.query).toBe('/songs?name=RPG&page=')
    expect(wrapper.vm.$data.page).toBe(1)
  })

  it('検索をかけるがヒットしない', done => {
    const vueInstance: any = wrapper.vm
    vueInstance.search('instrument=ネンリキ')
    setTimeout(done2 => {
      expect(wrapper.vm.$data.page).toBe(0)

      expect(wrapper.vm.$data.query).toBe('/songs?instrument=ネンリキ&page=')
      expect(wrapper.vm.$data.hasNextPageToLoad).toBeFalsy
      done2
      done()
    }, 5000)
  })

  it('モーダルが起動する', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.toggleModal('001')
  })
})
