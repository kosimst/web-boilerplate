import { Reducer } from 'redux'
import {
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_LOADING
} from '../actions/user'
import { RootAction } from '../store.js'

import User from '../classes/User'

export interface UserState {
  user: User | null
  loading: boolean
  error: string | null
}

const INITIAL_STATE: UserState = {
  user: null,
  loading: false,
  error: null
}

const user: Reducer<UserState, RootAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error: action.error
      }
    case UPDATE_USER_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state
  }
}

export default user
