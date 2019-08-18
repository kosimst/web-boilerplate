import { Reducer } from 'redux'
import {
  UPDATE_CURRENT_VIEW,
  UPDATE_LOADING_VIEW,
  UPDATE_VIEW_TITLE,
  UPDATE_OFFLINE
} from '../actions/app.js'
import { RootAction } from '../store.js'

export interface AppState {
  currentView: string
  loadingView: string | null
  viewTitle: string
  offline: boolean
}

const INITIAL_STATE: AppState = {
  currentView: '/',
  loadingView: '/',
  viewTitle: 'Home',
  offline: false
}

const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_VIEW:
      return {
        ...state,
        currentView: action.currentView
      }
    case UPDATE_LOADING_VIEW:
      return {
        ...state,
        loadingView: action.loadingView
      }
    case UPDATE_VIEW_TITLE:
      return {
        ...state,
        viewTitle: action.viewTitle
      }
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      }
    default:
      return state
  }
}

export default app
