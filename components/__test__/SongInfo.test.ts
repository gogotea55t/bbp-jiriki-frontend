import { shallowMount } from '@vue/test-utils'
import * as SongInfo from '../SongInfo.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

jest.setTimeout(20000)
const mock = new MockAdapter(axios)
const apiBaseUrl: any = process.env.apiBaseUrl //|| 'http://localhost:8080'

const sampleSong = {
  songId: '200',
  jirikiRank: '地力Ａ＋',
  songName: 'ミラクルペイント',
  contributor: 'タタナミ',
  instrument: 'ピアノ①'
}

const sampleScores = [
  { userName: '妖怪1', score: 100 },
  { userName: '妖怪2', score: 99 },
  { userName: 'どちらかというと妖怪', score: 88 },
  { userName: 'どちらかというと人間', score: 79 },
  { userName: '人間', score: 64 }
]

mock.onGet(apiBaseUrl + '/v1' + '/songs/200').reply(200, sampleSong)
mock.onGet(apiBaseUrl + '/v1' + '/songs/200/scores').reply(200, sampleScores)
describe(SongInfo.default, () => {
  it('初期状態では何も読み込まない', done => {
    const wrapper = shallowMount(SongInfo.default, {
      mocks: { Promise, mock }
    })

    expect(wrapper.vm.$data.songId).toBeFalsy
    setTimeout(done2 => {
      expect(wrapper.vm.$data.scores.length).toBe(0)
      expect(wrapper.vm.$data.song).toBeFalsy
      done2
      done()
    }, 5000)
  })
})

describe(SongInfo.default, () => {
  it('途中から楽曲IDが降ってくるとそれに応じたデータを取ってくる', async () => {
    const wrapper = shallowMount(SongInfo.default, {
      mocks: { Promise, mock }
    })

    const vueInstance: any = wrapper.vm
    const reply: Promise<string> = vueInstance.loadInfo('200')
    await reply.then(() => {
      expect(wrapper.vm.$data.scores.length).toBe(5)
      expect(wrapper.vm.$data.song.songId).toBe('200')
      wrapper.vm.$emit('song-loaded', 'ミラクルペイント(タタナミ) / ピアノ①')
    })
  })
})

describe(SongInfo.default, () => {
  it('サーバーから楽曲データが取れない', done => {
    const mockWhenNetWorkError = new MockAdapter(axios)
    mockWhenNetWorkError.onGet(apiBaseUrl + '/v1' + '/songs/200').networkError
    mockWhenNetWorkError
      .onGet(apiBaseUrl + '/v1/songs/200/scores')
      .reply(200, sampleScores)

    const wrapperWhenNetworkError = shallowMount(SongInfo.default, {
      mocks: {
        mockWhenNetWorkError,
        $route: {
          params: {
            id: '200'
          }
        }
      }
    })

    setTimeout(done2 => {
      expect(wrapperWhenNetworkError).toThrowError
      done2
      done()
    }, 5000)
  })
})

describe(SongInfo.default, () => {
  it('サーバーからスコアデータが取れない', done => {
    const mockWhenNetWorkError = new MockAdapter(axios)
    mockWhenNetWorkError
      .onGet(apiBaseUrl + '/v1' + '/songs/200')
      .reply(200, sampleSong)
    mockWhenNetWorkError.onGet(apiBaseUrl + '/v1/songs/200/scores').networkError

    const wrapperWhenNetworkError = shallowMount(SongInfo.default, {
      mocks: {
        mockWhenNetWorkError,
        $route: {
          params: {
            id: '200'
          }
        }
      }
    })

    setTimeout(done2 => {
      expect(wrapperWhenNetworkError).toThrowError
      done2
      done()
    }, 5000)
  })
})
