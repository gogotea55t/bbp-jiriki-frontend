import { mount } from '@vue/test-utils'
import * as SearchWindow from '../SearchWindow.vue'

describe(SearchWindow.default, () => {
  const wrapper = mount(SearchWindow.default)

  it('検索ができる', () => {
    const searchAttr = wrapper.find('#search-attr')
    const searchButton = wrapper.find('#search-btn')
    searchAttr.setValue('instrument')
    const queryWord = wrapper.find('#query-word')
    queryWord.setValue('クラシックギター')
    searchButton.trigger('click')
    expect(wrapper.emitted()['search-emit'][0]).toContain(
      'instrument=クラシックギター'
    )
  })
})
describe(SearchWindow.default, () => {
  const wrapper = mount(SearchWindow.default)
  it('地力ランクで検索ができる', () => {
    const searchAttr = wrapper.find('#search-attr')
    const searchButton = wrapper.find('#search-btn')
    searchAttr.setValue('jiriki')
    const jirikiSelector = wrapper.find('#jiriki-selector')
    jirikiSelector.setValue('地力Ｅ')
    searchButton.trigger('click')
    expect(wrapper.emitted()['search-emit'][0]).toContain('jiriki=地力Ｅ')
  })
})