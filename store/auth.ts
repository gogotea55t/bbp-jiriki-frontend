export interface AuthState {
  loginUserId: String
}

export const state = (): AuthState => ({
  loginUserId: ''
})

export const mutations = {
  setLoginUserId(state: AuthState, userId: String) {
    state.loginUserId = userId
  }
}

export const actions = {
  setLoginUserId(context, userId: String) {
    context.commit('setLoginUserId', userId)
  }
}
