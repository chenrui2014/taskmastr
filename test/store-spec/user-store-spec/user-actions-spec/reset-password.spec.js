/* global describe it */
import chai from 'chai'
import {testAction} from '../../test-action'
import userActionsInjector from 'inject-loader!../../../../src/store/user-store/user-actions' // eslint-disable-line import/no-webpack-loader-syntax

chai.should()

describe('resetPassword', () => {
  it('dispatches SET_USERNAME on success', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        reset (token, newKey, cb) {
          cb(null, {username: 'username'})
        }
      }
    })

    testAction(userActions.resetPassword, { token: 'token', key: 'newKey' }, {}, [
      {name: 'SET_USERNAME', payload: 'username'}
    ], done)
  })

  it('dispatches RESET_FAIL on failure', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        reset (token, newKey, cb) {
          cb(new Error('Error!'), {status: 401})
        }
      }
    })

    testAction(userActions.resetPassword, { token: 'token', key: 'newKey' }, {}, [
      {name: 'SET_RESET_FAIL', payload: 'Error!'}
    ], done)
  })
})
