import { GET_REPOS_DATA } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REPOS_DATA:
      return action.payload
    default:
      return state
  }
}
