import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as UserStats from '../UserStats.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Vuex from 'vuex'

const mock = new MockAdapter(axios)
const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: {
      loginUserId: 'u015'
    }
  }
})
describe(UserStats.default, () => {
  const wrapper = shallowMount(UserStats.default, {
    mocks: { mock },
    localVue,
    store
  })

  it('', () => {})
})
