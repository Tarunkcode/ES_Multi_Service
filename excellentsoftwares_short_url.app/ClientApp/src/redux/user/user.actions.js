// function that return obj ,each obj is in correct format that the action is expected to be.
import { UserActionTypes } from './user.types' // store the state of our current User

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});