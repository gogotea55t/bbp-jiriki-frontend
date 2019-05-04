import { shallowMount } from '@vue/test-utils'
import * as Player from '../player.vue'
import SongsTableWithScoreStub from '../__stubs__/SongsTableWithScoreStub.vue'

describe(Player.default, () => {
  const wrapper = shallowMount(Player.default, {
    propsData: {
      query: '/players/u001/scores?page=',
      playerId: '/u001',
      page: 0
    },
    stubs: {
      SongsTableWithScore: SongsTableWithScoreStub
    }
  })

  it('とりあえず表示できる', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('真っ先に表示されるのはu001さんのスコア', () => {
    expect(wrapper.vm.$data.query).toBe('/players/u001/scores?page=')
    expect(wrapper.vm.$data.page).toBe(0)
  })

  it('プレイヤーを切り替えるとクエリが切り替わる', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.searchByPlayer('u002')
    expect(wrapper.vm.$data.query).toBe('/players/u002/scores?page=')
    expect(wrapper.vm.$data.page).toBe(0)
  })

  it('一度読みこんだ後、もっと読み込むと同じクエリの2ページ目を取りに行く', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.getMore()
    expect(wrapper.vm.$data.page).toBe(1)
  })

  it('2回読みこむともう読み込むものが無くなる', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.searchByPlayer('u001')
    vueInstance.getMore()
    vueInstance.getMore()
    expect(wrapper.vm.$data.page).toBe(2)
  })

  it('楽曲などで検索をかけることができる', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.searchByPlayer('u001')
    vueInstance.searchSongs('instrument=クラシックギター')
    expect(wrapper.vm.$data.query).toBe(
      '/players/u001/scores?instrument=クラシックギター&page='
    )
    expect(wrapper.vm.$data.page).toBe(0)
  })

  it('スクロールする', () => {
    window.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }))
  })
})
