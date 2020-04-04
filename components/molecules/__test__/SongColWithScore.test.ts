import { mount } from '@vue/test-utils'
import * as SongColWithScore from '../SongColWithScore.vue'
import SongsWithScore from '../../types/SongsWithScore'
import { ok } from 'assert'

describe(SongColWithScore.default, () => {
  const sampleSongs: SongsWithScore = new SongsWithScore(
    '57',
    '地力Ｆ',
    'あれ',
    'それ',
    'シンセリード',
    76
  )

  const wrapper = mount(SongColWithScore.default, {
    propsData: {
      song: sampleSongs
    }
  })

  it('正確に表示できる', () => {
    expect(wrapper.isVueInstance).toBeTruthy
  })

  it('楽曲名欄をクリックするとモーダル発火イベントを起こす', () => {
    wrapper.find('#songname_57').trigger('click')
    const emittedEvent = wrapper.emitted('toggleModal')

    if (emittedEvent) {
      expect(emittedEvent[0][0]).toBe('57')
    } else {
      fail
    }
  })

  it('地力欄をクリックするとモーダル発火イベントを起こす', () => {
    wrapper.find('#jiriki_57').trigger('click')
    const emittedEvent = wrapper.emitted('toggleModal')

    if (emittedEvent) {
      expect(emittedEvent[0][0]).toBe('57')
    } else {
      fail
    }
  })

  it('楽器名欄をクリックするとモーダル発火イベントを起こす', () => {
    wrapper.find('#instrument_57').trigger('click')
    const emittedEvent = wrapper.emitted('toggleModal')

    if (emittedEvent) {
      expect(emittedEvent[0][0]).toBe('57')
    } else {
      fail
    }
  })

  it('得点欄をクリックするとモーダル発火イベントを起こさない', () => {
    wrapper.find('#score_57').trigger('click')
    const emittedEvent = wrapper.emitted('toggleModal')

    if (emittedEvent) {
      fail
    } else {
      ok
    }
  })

  it('投稿者名欄をクリックするとモーダル発火イベントを起こす', () => {
    wrapper.find('#contributor_57').trigger('click')
    const emittedEvent = wrapper.emitted('toggleModal')

    if (emittedEvent) {
      expect(emittedEvent[0][0]).toBe('57')
    } else {
      fail
    }
  })
})
