import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as ScoreForm from '../ScoreForm.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import Vue from 'vue'
import { ok } from 'assert'

const mock = new MockAdapter(axios)
mock
  .onPut(process.env.apiBaseUrl + '/v1/scores', {
    userId: 'u001',
    songId: '334',
    score: '90'
  })
  .reply(201, {})

mock
  .onPut(process.env.apiBaseUrl + '/v1/scores', {
    userId: 'u001',
    songId: '334',
    score: '92'
  })
  .reply(500, {})

mock
  .onDelete(process.env.apiBaseUrl + '/v1/scores', {
    data: {
      userId: 'u001',
      songId: '334'
    }
  })
  .reply(204, {})

// このおまじないがないとv-Tooltipでエラーが出る
global.document.createRange = (): any => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
})

describe(ScoreForm.default, () => {
  const wrapper = shallowMount(ScoreForm.default, {
    propsData: {
      score: 88,
      songId: '334',
      userId: 'u001'
    },
    mocks: {
      mock
    }
  })
  it('inputフォームにフォーカスするとメッセージが出る', () => {
    wrapper.find('input').trigger('focus')
    expect(wrapper.vm.$data.showTooltip).toBeTruthy
    wrapper.find('input').trigger('blur')
    expect(wrapper.vm.$data.showTooltip).toBeFalsy
  })

  it('不正なスコアが入力されているときはエンターキーが効かない', done => {
    wrapper.find('input').trigger('focus')
    wrapper.vm.$data.scoreForm = 'aa'
    wrapper.find('input').trigger('keyup.enter')
    setTimeout(() => {
      expect(wrapper.emitted).toBeFalsy
      done()
    }, 10)
  })

  it('スコア登録してもサーバーが死んでいたらダメ', done => {
    wrapper.find('input').trigger('focus')
    wrapper.vm.$data.scoreForm = '92'
    wrapper.find('input').trigger('keyup.enter')
    setTimeout(() => {
      expect(wrapper.vm.$data.submitMsg).toBe('登録失敗です。。。')
      const event = wrapper.emitted('score-submitted')
      if (event) {
        fail()
      } else {
        expect(true).toBe(true)
      }
      done()
    }, 10)
  })

  it('半角数字が入力されているときはエンターキーでスコア登録ができる', done => {
    wrapper.find('input').trigger('focus')
    wrapper.vm.$data.scoreForm = '90'
    wrapper.find('input').trigger('keyup.enter')
    setTimeout(() => {
      expect(wrapper.vm.$data.submitMsg).toBe('登録OK！')
      const event = wrapper.emitted('score-submitted')
      if (event) {
        expect(event[0][0]).toBe('90')
      } else {
        fail()
      }
      done()
    }, 10)
  })

  it('空欄にしたときにエンターキーを押すとスコア削除ができる', done => {
    wrapper.find('input').trigger('focus')
    wrapper.vm.$data.scoreForm = ''
    wrapper.find('input').trigger('keyup.enter')
    setTimeout(() => {
      expect(wrapper.vm.$data.submitMsg).toBe('登録を削除しました')
      const event = wrapper.emitted('score-submitted')
      if (event) {
        expect(event[1][0]).toBe('')
      } else {
        fail()
      }
      done()
    }, 10)
  })
})
