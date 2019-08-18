import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store.js'

export const UPDATE_CURRENT_VIEW = 'app/UPDATE_CURRENT_VIEW'
export const UPDATE_LOADING_VIEW = 'app/UPDATE_LOADING_VIEW'
export const UPDATE_VIEW_TITLE = 'app/UPDATE_VIEW_TITLE'
export const UPDATE_OFFLINE = 'app/UPDATE_OFFLINE'

export interface AppActionUpdateCurrentView
  extends Action<'app/UPDATE_CURRENT_VIEW'> {
  currentView: string
}

export interface AppActionUpdateLoadingView
  extends Action<'app/UPDATE_LOADING_VIEW'> {
  loadingView: string | null
}

export interface AppActionUpdateViewTitle
  extends Action<'app/UPDATE_VIEW_TITLE'> {
  viewTitle: string
}

export interface AppActionUpdateOffline extends Action<'app/UPDATE_OFFLINE'> {
  offline: boolean
}

export type AppAction =
  | AppActionUpdateCurrentView
  | AppActionUpdateLoadingView
  | AppActionUpdateOffline
  | AppActionUpdateViewTitle

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>

/**
 * Navigates to the given path and sets depending states accordingly
 * @param path Target path
 */
export const navigate: ActionCreator<ThunkResult> = (
  path: string
) => dispatch => {
  // Extract the view name from path.
  const view =
    path === '/' ? 'home' : path === 'notfound' ? path : path.slice(1)

  // Update loading view
  dispatch(updateLoadingView(view))

  // Load view
  dispatch(loadView(view))
}

/**
 * Load given view and set title
 * @param view Name of view to be loaded
 */
const loadView: ActionCreator<ThunkResult> = (
  view: string
) => async dispatch => {
  try {
    const { title = '' } = await import(`../views/view-${view}.js`)
    updateViewTitle(title)
  } catch (e) {
    console.error(`Error while loading requested view '${view}': `, e)
    navigate('notfound')
  }

  dispatch(updateCurrentView(view))
}

const updateCurrentView: ActionCreator<AppActionUpdateCurrentView> = (
  currentView: string
) => {
  return {
    type: UPDATE_CURRENT_VIEW,
    currentView
  }
}

const updateLoadingView: ActionCreator<AppActionUpdateLoadingView> = (
  loadingView: string
) => {
  return {
    type: UPDATE_LOADING_VIEW,
    loadingView
  }
}

const updateViewTitle: ActionCreator<AppActionUpdateViewTitle> = (
  viewTitle: string
) => {
  return {
    type: UPDATE_VIEW_TITLE,
    viewTitle
  }
}

export const updateOffline: ActionCreator<AppActionUpdateOffline> = (
  offline: boolean
) => {
  return {
    type: UPDATE_OFFLINE,
    offline
  }
}
