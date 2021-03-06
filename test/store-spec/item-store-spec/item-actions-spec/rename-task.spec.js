/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import itemActionsInjector from 'inject-loader!../../../../src/store/item-store/item-actions' // eslint-disable-line import/no-webpack-loader-syntax

chai.should()

describe('renameTask', () => {
  it('dispatches RENAME_TASK', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
          cb(null, { success: true })
        }
      }
    })

    let state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1'
          }
        ]
      }
    }
    testAction(itemActions.renameTask, { index: 0, name: 'Item 0' }, state, [
      { name: 'RENAME_TASK', payload: { index: 0, name: 'Item 0' } }
    ], done)
  })

  it('dispatches RENAME_TASK twice on error', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
          cb(new Error('Error!'), { status: 500 })
        }
      }
    })

    let state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1'
          }
        ]
      }
    }
    testAction(itemActions.renameTask, { index: 0, name: 'Item 0' }, state, [
      { name: 'RENAME_TASK', payload: { index: 0, name: 'Item 0' } },
      { name: 'RENAME_TASK', payload: { index: 0, name: 'Item 1' } }
    ], done)
  })
})
