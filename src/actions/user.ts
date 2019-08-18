import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store.js'

import User from '../classes/User.js'
import { signIn } from '../functions/firebase.js'

export const UPDATE_USER = 'user/UPDATE_USER'
export const UPDATE_USER_ERROR = 'user/UPDATE_USER_ERROR'
export const UPDATE_USER_LOADING = 'user/UPDATE_USER_LOADING'

export interface UserActionUpdateUserLoading
  extends Action<'user/UPDATE_USER_LOADING'> {
  loading: boolean
}

export interface UserActionUpdateUserError
  extends Action<'user/UPDATE_USER_ERROR'> {
  error: string | null
}

export interface UserActionUpdateUser extends Action<'user/UPDATE_USER'> {
  user: User | null
}

export type UserAction =
  | UserActionUpdateUser
  | UserActionUpdateUserLoading
  | UserActionUpdateUserError

type ThunkResult = ThunkAction<void, RootState, undefined, UserAction>

export const signInUser: ActionCreator<ThunkResult> = () => async dispatch => {
  dispatch(updateUserLoading(true))
  try {
    const { displayName, email, photoUrl } = await signIn()

    const updatedUser = new User(displayName, email, photoUrl)
    dispatch(updateUser(updatedUser))
  } catch (e) {
    console.error('Sign-in failed: ', e)
    dispatch(updateUserError(e.message))
  }
  dispatch(updateUserLoading(false))
}

const updateUserLoading: ActionCreator<UserActionUpdateUserLoading> = (
  loading: boolean
) => {
  return {
    type: UPDATE_USER_LOADING,
    loading
  }
}

const updateUserError: ActionCreator<UserActionUpdateUserError> = (
  error: string | null
) => {
  return {
    type: UPDATE_USER_ERROR,
    error
  }
}

export const updateUser: ActionCreator<UserActionUpdateUser> = (
  user: User | null
) => {
  return {
    type: UPDATE_USER,
    user
  }
}
