/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('resetPassword', () => {
  it('dispatches SET_USERNAME on success', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        reset (token, newKey, cb) {
          cb(null, {username: 'username'})
        }
      }
    })

    testAction(actions.default.resetPassword, ['token', 'newKey'], {}, [
      {name: 'SET_USERNAME', payload: ['username']}
    ], done)
  })

  it('dispatches RESET_FAIL on failure', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        reset (token, newKey, cb) {
          cb('Invalid link', {status: 401})
        }
      }
    })

    testAction(actions.default.resetPassword, ['token', 'newKey'], {}, [
      {name: 'SET_RESET_FAIL', payload: ['Invalid link']}
    ], done)
  })
})
