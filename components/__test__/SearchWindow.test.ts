import { mount } from '@vue/test-utils'
import * as SearchWindow from '../SearchWindow.vue'

describe(SearchWindow.default, () => {
  const wrapper = mount(SearchWindow.default)

  it('検索ができる', () => {
    const searchAttr = wrapper.find('#search-attr')
    searchAttr.setValue('instrument')
    const queryWord = wrapper.find('#query-word')
    queryWord.setValue('クラシックギター')
    const searchButton = wrapper.find('#search-btn')
    searchButton.trigger('click')

    expect(wrapper.emitted()['search-emit'][0]).toContain(
      'instrument=クラシックギター'
    )
  })
})
