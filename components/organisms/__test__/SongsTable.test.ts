import { mount, shallowMount } from '@vue/test-utils'
import * as SongsTable from '../SongsTable.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const sampleSongs = {
  data: [
    {
      songId: '98',
      jirikiRank: '地力Ａ',
      songName: 'OTEMBA-Girls-Celebration!(エレクトリカルひなまつり受賞曲)',
      contributor: 'さんだ',
      instrument: 'E・ベース'
    },
    {
      songId: '97',
      jirikiRank: '地力Ａ',
      songName: 'NYANYANYANYANYANYANYA!',
      contributor: 'わさお',
      instrument: 'トランペット'
    },
    {
      songId: '96',
      jirikiRank: '地力Ａ',
      songName: 'NYANYANYANYANYANYANYA!',
      contributor: 'わさお',
      instrument: 'チェンバロ'
    },
    {
      songId: '95',
      jirikiRank: '個人差Ａ＋',
      songName: 'ほっほーい!!（ゲロルちゃん受賞曲）',
      contributor: 'んば',
      instrument: 'シンセベース'
    },
    {
      songId: '94',
      jirikiRank: '個人差Ａ＋',
      songName: '脳漿炸裂ガール',
      contributor: 'カレーおうじ',
      instrument: 'ピアノ'
    },
    {
      songId: '93',
      jirikiRank: '個人差Ａ＋',
      songName: '朝陽の中へ',
      contributor: 'DXいしょく@ハスキー',
      instrument: 'ピックベース'
    },
    {
      songId: '92',
      jirikiRank: '個人差Ａ＋',
      songName: '初音ミクの戸惑',
      contributor: 'こくみん',
      instrument: 'スクエアリード'
    },
    {
      songId: '523',
      jirikiRank: '地力Ｅ',
      songName: '恋は渾沌の隷也',
      contributor: 'ヤマた',
      instrument: 'スラップベース'
    },
    {
      songId: '90',
      jirikiRank: '個人差Ａ＋',
      songName: 'めざせポケモンマスター',
      contributor: 'ラティオス',
      instrument: 'アコーディオン'
    },
    {
      songId: '198',
      jirikiRank: '地力Ｂ',
      songName: 'BEAUTIFUL SKY',
      contributor: 'ドルジ',
      instrument: 'シンセリード①'
    },
    {
      songId: '338',
      jirikiRank: '地力Ｃ',
      songName: 'スリル',
      contributor: 'ルイ',
      instrument: 'サイン'
    },
    {
      songId: '197',
      jirikiRank: '地力Ｂ',
      songName: 'BABEL～GRAND STORY～',
      contributor: 'DXいしょく@Arinuco',
      instrument: 'シンセリード'
    },
    {
      songId: '195',
      jirikiRank: '個人差Ｂ＋',
      songName: '邪悪なる飛翔',
      contributor: 'しはす',
      instrument: 'ピアノ'
    },
    {
      songId: '37',
      jirikiRank: '地力Ｓ',
      songName: 'WONDERFUL RUSH',
      contributor: 'ラブライバー',
      instrument: 'ファットリード'
    },
    {
      songId: '550',
      jirikiRank: '個人差Ｆ',
      songName: 'マリオ絵描き歌',
      contributor: 'Nintendo',
      instrument: 'ファミコンA②'
    },
    {
      songId: '544',
      jirikiRank: '地力Ｆ',
      songName: 'ミラクルペイント',
      contributor: 'タタナミ',
      instrument: 'A・ベース'
    },
    {
      songId: '192',
      jirikiRank: '個人差Ｂ＋',
      songName: '大迷惑',
      contributor: 'よりねえトップ',
      instrument: 'OD・ギター'
    },
    {
      songId: '381',
      jirikiRank: '地力Ｄ',
      songName: 'ARK',
      contributor: 'ごごのこうちゃ',
      instrument: 'サイン'
    },
    {
      songId: '190',
      jirikiRank: '個人差Ｂ＋',
      songName: '光の戦士たち',
      contributor: 'なるるん',
      instrument: 'ピックベース'
    },
    {
      songId: '89',
      jirikiRank: '個人差Ａ＋',
      songName: 'パーティゲーム(架空のゲームソング受賞曲)',
      contributor: 'とらいじん',
      instrument: 'マリンバ'
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
      instrument: 'マリンバ'
    },
    {
      songId: '1453',
      jirikiRank: '求90',
      songName: 'QUATRE MAINS(A QUATRE MAINS)=3EM16=',
      contributor: 'たいちょー',
      instrument: 'ピアノ①'
    },
    {
      songId: '1120',
      jirikiRank: '個人差Ｓ＋',
      songName: '傷だらけの天使',
      contributor: 'なるるん',
      instrument: 'アルトサックス'
    },
    {
      songId: '49',
      jirikiRank: '個人差Ｓ',
      songName: 'LEVEL∞',
      contributor: 'ぜったいれいど',
      instrument: 'ファミコンベース'
    },
    {
      songId: '120',
      jirikiRank: '個人差Ａ',
      songName: 'GO!GO!MANIAC',
      contributor: 'キュウイレブン',
      instrument: 'スクエアリード'
    }
  ]
}

jest.setTimeout(20000)

const mock = new MockAdapter(axios)
const apiBaseUrl = process.env.apiBaseUrl
mock.onGet(apiBaseUrl + '/v1' + '/songs?page=').reply(200, sampleSongs.data)
mock
  .onGet(apiBaseUrl + '/v1' + '/songs?page=1')
  .reply(200, sampleSongsPage2.data)

describe(SongsTable.default, () => {
  const wrapper = mount(SongsTable.default, {
    propsData: {
      query: '/songs?page='
    },
    mocks: {
      mock
    }
  })

  it('楽曲の読み込みができる', done => {
    setTimeout(done2 => {
      expect(wrapper.vm.$data.songs.length).toBe(20)
      done2
      done()
    }, 5000)
  })

  it('モーダル発火イベントを受け取ると親へ横流しする', () => {
    const vueInstance: any = wrapper.vm
    vueInstance.toggleModal('001')
    const event = wrapper.emitted('toggle-modal') || fail()
    expect(event[0][0]).toBe('001')
  })

  it('読み込んだ後さらに読み込む', done => {
    const vueInstance: any = wrapper.vm
    const reply: Promise<number> = vueInstance.loadMore('/songs?page=1')
    setTimeout(done2 => {
      expect(wrapper.vm.$data.songs.length).toBe(25)
      reply.then(response => {
        expect(response).toBe(5)
      })
      done2
      done()
    }, 5000)
  })
})

describe(SongsTable.default, () => {
  it('ページ読み込み時にネットワークエラー', () => {
    const mockWhenNetworkError = new MockAdapter(axios)
    mockWhenNetworkError.onGet(apiBaseUrl + '/v1' + '/songs?page=').networkError
    const wrapperWhenNetworkError = shallowMount(SongsTable.default, {
      propsData: {
        query: '/songs?page='
      },
      mocks: {
        mockWhenNetworkError
      }
    })
    expect(wrapperWhenNetworkError.vm).toThrowError
  })

  it('ページ読み込み時に生きていたサーバが次ページを読み込むとき急に死ぬ', async () => {
    const mockWhenNetworkError = new MockAdapter(axios)
    mockWhenNetworkError
      .onGet(apiBaseUrl + '/v1' + '/songs?page=')
      .reply(200, sampleSongs.data)
    mockWhenNetworkError.onGet(apiBaseUrl + '/v1' + '/songs?page=1')
      .networkError

    const wrapperWhenNetworkError = shallowMount(SongsTable.default, {
      propsData: {
        query: '/songs?page='
      },
      mocks: {
        mockWhenNetworkError
      }
    })
    let vueInstance: any = wrapperWhenNetworkError.vm
    let errorExpected: Promise<number> = vueInstance.loadMore('/songs?page=1')
    return errorExpected.catch(error => {
      expect(error.message).toBe('サーバーとの通信に失敗しました')
    })
  })
})
