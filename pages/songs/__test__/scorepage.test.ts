import { shallowMount } from '@vue/test-utils'
import * as ScorePage from '../_id.vue'
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
describe(ScorePage.default, () => {
  it('サーバーからデータを取得できる', done => {
    const wrapper = shallowMount(ScorePage.default, {
      mocks: {
        $route: {
          params: {
            id: '200'
          }
        },
        Promise,
        mock
      }
    })

    expect(wrapper.vm.$data.id).toBe('200')
    setTimeout(done2 => {
      expect(wrapper.vm.$data.scores.length).toBe(5)
      expect(wrapper.vm.$data.song.songId).toBe('200')
      done2
      done()
    }, 5000)
  })
})
