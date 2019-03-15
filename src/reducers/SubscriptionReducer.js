import { GET_SUBSCRIPTIONS } from '../actions/types'

const initialState = {
  active: false,
  url: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUBSCRIPTIONS:
      return action.payload

    default:
      return state
  }
}
