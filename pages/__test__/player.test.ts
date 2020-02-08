import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as Player from '../player.vue'
import SongsTableWithScoreStub from '../__stubs__/SongsTableWithScoreStub.vue'
import SongInfoModalStub from '../__stubs__/SongInfoModalStub.vue'
import Vuex from 'vuex'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe(Player.default, () => {
  const store = new Vuex.Store({
    state: {
      auth: {
        loginUserId: null
      }
    }
  })
  const wrapper = shallowMount(Player.default, {
    propsData: {
      query: '/players/u001/scores?page=',
      playerId: '/u001',
      page: 0
    },
    stubs: {
      SongsTableWithScore: SongsTableWithScoreStub,
      SongInfoModal: SongInfoModalStub
    },
    store,
    localVue
  })

  it('とりあえず表示できる', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('真っ先に表示されるのは平均値のスコア', () => {
    expect(wrapper.vm.$data.query).toBe('/players/average/scores?page=')
    expect(wrapper.vm.$data.page).toBe(0)
  })

  it('プレイヤーを切り替えるとクエリが切り替わる', () => {
    wrapper.setData({ playerId: 'u002' })
    Vue.nextTick(() => {
      expect(wrapper.vm.$data.query).toBe('/players/u002/scores?page=')
      expect(wrapper.vm.$data.page).toBe(0)
    })
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
    setTimeout(() => {
      expect(wrapper.vm.$data.hasNextPageToLoad).toBeFalsy
      expect(wrapper.vm.$data.page).toBe(2)
    }, 5000)
  })

  it('楽曲などで検索をかけることができる', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.searchByPlayer('u001')
    vueInstance.searchSongs('instrument=クラシックギター')
    setTimeout(() => {
      expect(wrapper.vm.$data.query).toBe(
        '/players/u001/scores?instrument=クラシックギター&page='
      )
      expect(wrapper.vm.$data.page).toBe(0)
    }, 5000)
  })

  it('検索をかけるがヒットしないときは読み込みを中止できる', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.searchByPlayer('u001')
    vueInstance.searchSongs('contributor=クラシックギター')
    setTimeout(() => {
      expect(wrapper.vm.$data.query).toBe(
        '/players/u001/scores?contributor=クラシックギター&page='
      )
      expect(wrapper.vm.$data.page).toBe(0)
    }, 5000)
  })

  it('モーダル発火イベントを受け取る', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.toggleModal('57')
  })

  it('プレイヤーが切り替わるとクエリが切り替わる', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.playerIdChanged('u005')
    Vue.nextTick(() => {
      expect(wrapper.vm.$data.playerId).toBe('u005')
      expect(wrapper.vm.$data.query).toBe('/players/u005/scores?page=')
    })
  })
})

describe(Player.default, () => {
  const store = new Vuex.Store({
    state: {
      auth: {
        loginUserId: 'u004'
      }
    }
  })

  const wrapper = shallowMount(Player.default, {
    propsData: {
      query: '/players/u001/scores?page=',
      playerId: '/u001',
      page: 0
    },
    stubs: {
      SongsTableWithScore: SongsTableWithScoreStub,
      SongInfoModal: SongInfoModalStub
    },
    store,
    localVue
  })

  it('storeにユーザーIDが入っているときはそこから情報を取る', () => {
    expect(wrapper.vm.$data.query).toBe('/players/u004/scores?page=')
  })
})
