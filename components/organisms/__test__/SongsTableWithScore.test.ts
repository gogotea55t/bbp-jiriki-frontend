import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import * as SongTableWithScore from '../SongsTableWithScore.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import Vuex from 'vuex'

const sampleSongs = {
  data: [
    {
      songId: '98',
      jirikiRank: '地力Ａ',
      songName: 'OTEMBA-Girls-Celebration!(エレクトリカルひなまつり受賞曲)',
      contributor: 'さんだ',
      instrument: 'E・ベース',
      score: 10,
      max: 100,
      average: 50
    },
    {
      songId: '529',
      jirikiRank: '個人差Ｅ',
      songName: '猿の入った温泉はとてもヤバい',
      contributor: 'へいおまち',
      instrument: 'D・ギター①',
      score: 100,
      max: 99,
      average: 60
    },
    {
      songId: '96',
      jirikiRank: '地力Ａ',
      songName: 'NYANYANYANYANYANYANYA!',
      contributor: 'わさお',
      instrument: 'チェンバロ',
      score: 30,
      max: 80,
      average: 50.5
    },
    {
      songId: '466',
      jirikiRank: '個人差Ｄ',
      songName: 'クラクション・ラヴ',
      contributor: 'よりねえトップ',
      instrument: 'ピックベース',
      score: 100,
      max: 99,
      average: 88.88
    },
    {
      songId: '94',
      jirikiRank: '個人差Ａ＋',
      songName: '脳漿炸裂ガール',
      contributor: 'カレーおうじ',
      instrument: 'ピアノ',
      score: 50,
      max: 99,
      average: 50
    },
    {
      songId: '365',
      jirikiRank: '個人差Ｃ',
      songName: 'CAGAYAKE!GIRLS',
      contributor: 'もっちゃん',
      instrument: 'ピックベース',
      score: 98,
      max: 99,
      average: 50
    },
    {
      songId: '92',
      jirikiRank: '地力Ａ＋',
      songName: '初音ミクの戸惑',
      contributor: 'こくみん',
      instrument: 'スクエアリード',
      score: 70,
      max: 99,
      average: 50
    },
    {
      songId: '523',
      jirikiRank: '地力Ｅ',
      songName: '恋は渾沌の隷也',
      contributor: 'ヤマた',
      instrument: 'スラップベース',
      score: 80,
      max: 99,
      average: 50
    },
    {
      songId: '277',
      jirikiRank: '個人差Ｂ',
      songName: "Jack-o'-Lantern said…",
      contributor: 'HT',
      instrument: 'オルゴール①',
      score: 95,
      max: 99,
      average: 50
    },
    {
      songId: '1108',
      jirikiRank: '地力Ｂ＋',
      songName: "SISTER'S NOISE",
      contributor: 'サマフ',
      instrument: 'E・ベース',
      score: 98,
      max: 99,
      average: 50
    },
    {
      songId: '338',
      jirikiRank: '地力Ｃ',
      songName: 'スリル',
      contributor: 'ルイ',
      instrument: 'サイン',
      score: 92,
      max: 99,
      average: 50
    },
    {
      songId: '197',
      jirikiRank: '地力Ｂ',
      songName: 'BABEL～GRAND STORY～',
      contributor: 'DXいしょく@Arinuco',
      instrument: 'シンセリード',
      score: 93,
      max: 99,
      average: 50
    },
    {
      songId: '195',
      jirikiRank: '個人差Ｂ＋',
      songName: '邪悪なる飛翔',
      contributor: 'しはす',
      instrument: 'ピアノ',
      score: 94,
      max: 99,
      average: 50
    },
    {
      songId: '37',
      jirikiRank: '地力Ｓ',
      songName: 'WONDERFUL RUSH',
      contributor: 'ラブライバー',
      instrument: 'ファットリード',
      score: 95,
      max: 99,
      average: 50
    },
    {
      songId: '550',
      jirikiRank: '個人差Ｆ',
      songName: 'マリオ絵描き歌',
      contributor: 'Nintendo',
      instrument: 'ファミコンA②',
      score: 96,
      max: 99,
      average: 50
    },
    {
      songId: '544',
      jirikiRank: '地力Ｆ',
      songName: 'ミラクルペイント',
      contributor: 'タタナミ',
      instrument: 'A・ベース',
      score: 97,
      max: 99,
      average: 50
    },
    {
      songId: '192',
      jirikiRank: '個人差Ｂ＋',
      songName: '大迷惑',
      contributor: 'よりねえトップ',
      instrument: 'OD・ギター',
      score: 98,
      max: 99,
      average: 50
    },
    {
      songId: '381',
      jirikiRank: '地力Ｄ',
      songName: 'ARK',
      contributor: 'ごごのこうちゃ',
      instrument: 'サイン',
      score: 99,
      max: 99,
      average: 50
    },
    {
      songId: '190',
      jirikiRank: '個人差Ｂ＋',
      songName: '光の戦士たち',
      contributor: 'なるるん',
      instrument: 'ピックベース',
      score: 100,
      max: 99,
      average: 50
    },
    {
      songId: '89',
      jirikiRank: '個人差Ａ＋',
      songName: 'パーティゲーム(架空のゲームソング受賞曲)',
      contributor: 'とらいじん',
      instrument: 'マリンバ',
      score: 99,
      max: 99,
      average: 50
    }
  ]
}

const sampleSongsPage2 = {
  data: [
    {
      songId: '989',
      jirikiRank: '個人差Ｆ',
      songName: 'こんなのあったっけ',
      contributor: 'サンプル',
      instrument: 'マリンバ',
      score: 99,
      max: 99,
      average: 50
    },
    {
      songId: '1453',
      jirikiRank: '求90',
      songName: 'QUATRE MAINS(A QUATRE MAINS)=3EM16=',
      contributor: 'たいちょー',
      instrument: 'ピアノ①',
      score: null,
      max: 99,
      average: 50
    },
    {
      songId: '1120',
      jirikiRank: '個人差Ｓ＋',
      songName: '傷だらけの天使',
      contributor: 'なるるん',
      instrument: 'アルトサックス',
      score: 89,
      max: 99,
      average: 50
    },
    {
      songId: '49',
      jirikiRank: '個人差Ｓ',
      songName: 'LEVEL∞',
      contributor: 'ぜったいれいど',
      instrument: 'ファミコンベース',
      score: 89,
      max: 99,
      average: 50
    },
    {
      songId: '120',
      jirikiRank: '個人差Ａ',
      songName: 'GO!GO!MANIAC',
      contributor: 'キュウイレブン',
      instrument: 'スクエアリード',
      score: 98,
      max: 99,
      average: 50
    }
  ]
}

jest.setTimeout(20000)

const mock = new MockAdapter(axios)
const apiBaseUrl: string = process.env.apiBaseUrl || 'http://localhost:8080'
mock
  .onGet(apiBaseUrl + '/v2' + '/players/u001/scores')
  .reply(200, sampleSongs.data)
mock
  .onGet(apiBaseUrl + '/v2' + '/players/u001/scores?page=2')
  .reply(200, sampleSongsPage2.data)

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: {
      loginUserId: null
    }
  }
})

describe(SongTableWithScore.default, () => {
  it('表示できる', () => {
    const wrapper = mount(SongTableWithScore.default, {
      mocks: {
        mock,
        $nuxt: {
          error: () => {}
        }
      },
      propsData: {
        query: '/players/u001/scores'
      },
      localVue,
      store
    })
    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('楽曲の読み込みができる', done => {
    const wrapper = mount(SongTableWithScore.default, {
      mocks: {
        mock,
        $nuxt: {
          error: () => {}
        }
      },
      propsData: {
        query: '/players/u001/scores'
      },
      localVue,
      store
    })

    setTimeout(done2 => {
      expect(wrapper.vm.$data.songs.length).toBe(20)
      done2
      done()
    }, 5000)
  })

  it('一度読みこんだ後さらに読み込む', done => {
    const wrapper = mount(SongTableWithScore.default, {
      mocks: {
        mock,
        $nuxt: {
          error: () => {}
        }
      },
      propsData: {
        query: '/players/u001/scores'
      },
      localVue,
      store
    })
    const vueInstance: any = wrapper.vm
    const reply: Promise<number> = vueInstance.loadMore(
      '/players/u001/scores?page=2'
    )
    setTimeout(done2 => {
      expect(wrapper.vm.$data.songs.length).toBe(25)
      reply.then(response => {
        expect(response).toBe(5)
      })
      done2
      done()
    }, 5000)
  })

  it('モーダル発火イベントを受け取ると親へ横流しする', () => {
    const wrapper = mount(SongTableWithScore.default, {
      mocks: {
        mock,
        $nuxt: {
          error: () => {}
        }
      },
      propsData: {
        query: '/players/u001/scores'
      },
      localVue,
      store
    })

    const vueInstance: any = wrapper.vm
    vueInstance.toggleModal('57')
    const event = wrapper.emitted('toggleModal')
    if (event) {
      expect(event[0][0]).toBe('57')
    } else {
      fail()
    }
  })
})

describe(SongTableWithScore.default, () => {
  it('ネットワークエラーでつながらない', () => {
    const mockWithNetworkError = new MockAdapter(axios)
    const apiBaseUrl: string = process.env.apiBaseUrl || 'http://localhost:8080'
    mockWithNetworkError.onGet(apiBaseUrl + '/v1/players/u001/scores')
      .networkError
    const wrapperWithNetworkError = mount(SongTableWithScore.default, {
      propsData: {
        query: '/players/u001/scores'
      },
      mocks: {
        mockWithNetworkError,
        $nuxt: {
          error: () => {}
        }
      },
      localVue,
      store
    })

    expect(wrapperWithNetworkError.vm.$nextTick).toThrowError
  })
})

describe(SongTableWithScore.default, () => {
  it('次を読み込もうとしたときにネットワークエラーで急につながらない', () => {
    const mockWithNetworkError = new MockAdapter(axios)
    const apiBaseUrl: string = process.env.apiBaseUrl || 'http://localhost:8080'
    mockWithNetworkError
      .onGet(apiBaseUrl + '/v1/players/u001/scores')
      .reply(200, sampleSongs)
    mockWithNetworkError.onGet(apiBaseUrl + '/v1/players/u001/scores?page=1')
      .networkError
    const wrapperWithNetworkError = mount(SongTableWithScore.default, {
      propsData: {
        query: '/players/u001/scores'
      },
      mocks: {
        mockWithNetworkError,
        $nuxt: {
          error: () => {}
        }
      },
      localVue,
      store
    })
    const vueInstance: any = wrapperWithNetworkError.vm
    const numberOfSongsAdded: Promise<number> = vueInstance.loadMore(
      '/players/u001/scores?page=1'
    )
    numberOfSongsAdded.catch(error => {
      expect(error.message).toBe('サーバーとの接続に失敗しました')
    })
  })
})
