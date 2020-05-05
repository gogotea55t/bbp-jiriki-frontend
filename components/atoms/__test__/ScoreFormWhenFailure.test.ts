import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as ScoreForm from '../ScoreForm.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { ok } from 'assert'
import { AuthServiceStub } from '../../../pages/__stubs__/AuthServiceMock'

const mock = new MockAdapter(axios)
mock
  .onDelete(process.env.apiBaseUrl + '/v1/scores', {
    data: {
      userId: 'u004',
      songId: '334'
    }
  })
  .reply(500, {})

// このおまじないがないとv-Tooltipでエラーが出る
global.document.createRange = (): any => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
})

it('空欄にしたときにエンターキーを押してスコア削除に失敗するとその旨表示される', done => {
  const wrapper2 = shallowMount(ScoreForm.default, {
    propsData: {
      score: 88,
      songId: '334',
      userId: 'u004'
    },
    mocks: {
      mock,
      $auth: new AuthServiceStub()
    }
  })
  wrapper2.find('input').trigger('focus')
  wrapper2.vm.$data.scoreForm = ''
  wrapper2.find('input').trigger('keyup.enter')
  setTimeout(() => {
    expect(wrapper2.vm.$data.submitMsg).toBe('削除失敗または削除済です')
    const event = wrapper2.emitted('score-submitted')
    if (event) {
      fail()
    } else {
      ok
    }
    done()
  }, 10)
})
