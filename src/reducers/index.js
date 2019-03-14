import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import reposReducer from './reposReducer'
import orgsReducer from './orgsReducer'
import notificationsReducer from './notificationsReducer'
import toggelReducers from './toggelReducer'
import subscriptionReducers from './subscriptionReducer'

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  repos: reposReducer,
  orgs: orgsReducer,
  notification: notificationsReducer,
  toggel: toggelReducers,
  subscription: subscriptionReducers
})
