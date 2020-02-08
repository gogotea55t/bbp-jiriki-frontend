export interface ScoreState {
  isDecimal: boolean
}

export const state = (): ScoreState => ({
  isDecimal: false
})

export const mutations = {
  setDecimal(state: ScoreState, isDecimal: boolean) {
    state.isDecimal = isDecimal
  }
}

export const actions = {
  setDecimal(context, isDecimal: boolean) {
    context.commit('setDecimal', isDecimal)
  }
}
