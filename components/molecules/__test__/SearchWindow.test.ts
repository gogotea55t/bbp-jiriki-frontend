import { mount } from '@vue/test-utils'
import * as SearchWindow from '../SearchWindow.vue'
import Vue from 'vue'

describe(SearchWindow.default, () => {
  const wrapper = mount(SearchWindow.default)

  it('検索ができる', () => {
    const searchAttr = wrapper.find('#search-attr')
    const searchButton = wrapper.find('#search-btn')
    searchAttr.setValue('instrument')
    const queryWord = wrapper.find('#query-word')
    queryWord.setValue('クラシックギター')
    searchButton.trigger('click')
    const event: String[][] = wrapper.emitted()['search-emit'] || fail()
    expect(event[0]).toContain('instrument=クラシックギター')
  })
})
describe(SearchWindow.default, () => {
  const wrapper = mount(SearchWindow.default)
  it('地力ランクで検索ができる', () => {
    const searchAttr = wrapper.find('#search-attr')
    const searchButton = wrapper.find('#search-btn')
    searchAttr.setValue('jiriki')
    Vue.nextTick(() => {
      const jirikiSelector = wrapper.find('#jiriki-selector')
      jirikiSelector.setValue('地力Ｅ')
      searchButton.trigger('click')
      const event = wrapper.emitted()['search-emit']
      if (event) {
        expect(event[0]).toContain('jiriki=地力Ｅ')
      } else {
        fail()
      }
    })
  })
})
