import { shallowMount } from '@vue/test-utils'
import * as SongInfo from '../SongInfo.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const apiBaseUrl: any = process.env.apiBaseUrl
const sampleSong = {
  songId: '200',
  jirikiRank: '地力Ａ＋',
  songName: 'ミラクルペイント',
  contributor: 'タタナミ',
  instrument: 'ピアノ①'
}

describe(SongInfo.default, () => {
  it('サーバーからスコアデータが取れない', done => {
    const mockWithNetWorkError = new MockAdapter(axios)
    mockWithNetWorkError
      .onGet(apiBaseUrl + '/v1' + '/songs/300')
      .reply(200, sampleSong)
    mockWithNetWorkError.onGet(apiBaseUrl + '/v1/songs/300/scores').networkError

    const wrapperWhenNetworkError_ = shallowMount(SongInfo.default, {
      mocks: {
        mockWithNetWorkError
      },
      propsData: {
        songId: ''
      }
    })

    setTimeout(done2 => {
      const vueI: any = wrapperWhenNetworkError_.vm
      expect(vueI.loadInfo('300')).toThrowError
      done2
      done()
    }, 1000)
  })
})
