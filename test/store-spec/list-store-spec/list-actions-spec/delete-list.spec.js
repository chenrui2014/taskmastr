/* global describe it sinon beforeEach afterEach */
import chai from 'chai'
import { testAction } from '../../test-action'
import listActionsInjector from 'inject-loader!../../../../src/store/list-store/list-actions' // eslint-disable-line import/no-webpack-loader-syntax

chai.should()

describe('deleteList', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches list deletion mutations when not current nor _deleting', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username',
        tasks: [
          {
            _id: 'listid',
            list: 'List 1',
            _deleting: false,
            items: [
              {
                _id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            _id: 'listid2',
            list: 'List 2',
            _deleting: false,
            items: [
              {
                _id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }

    testAction(listActions.deleteList, { index: 0 }, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid', val: 10 } },
      { name: 'SET_LIST_DELETE', payload: { index: 0, bool: true } },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid', val: null } },
      { name: 'SET_LIST_DELETE', payload: { index: 0, bool: false } },
      { name: 'REMOVE_LIST', payload: { index: 0 } }
    ], done)

    clock.tick(5000)
  })

  it('dispatches list deletion mutations when index is 0 and current', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      currentList: 'listid',
      user: {
        tasks: [
          {
            _id: 'listid',
            list: 'List 1',
            currentItem: 'itemid',
            _deleting: false,
            items: [
              {
                _id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            _id: 'listid2',
            list: 'List 2',
            currentItem: 'itemid2',
            _deleting: false,
            items: [
              {
                _id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }
    testAction(listActions.deleteList, { index: 0 }, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid', val: 11 } },
      { name: 'SET_LIST_DELETE', payload: { index: 0, bool: true } },
      { name: 'SET_CURRENT_LIST', payload: state.user.tasks[1] },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid', val: null } },
      { name: 'SET_LIST_DELETE', payload: { index: 0, bool: false } },
      { name: 'REMOVE_LIST', payload: { index: 0 } }
    ], done)

    clock.tick(5000)
  })

  it('dispatches list deletion mutations when index is last and current', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      currentList: 'listid2',
      user: {
        tasks: [
          {
            _id: 'listid',
            list: 'List 1',
            currentItem: 'itemid',
            _deleting: false,
            items: [
              {
                _id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            _id: 'listid2',
            list: 'List 2',
            currentItem: 'itemid2',
            _deleting: false,
            items: [
              {
                _id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }
    testAction(listActions.deleteList, { index: 1 }, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid2', val: 12 } },
      { name: 'SET_LIST_DELETE', payload: { index: 1, bool: true } },
      { name: 'SET_CURRENT_LIST', payload: state.user.tasks[0] },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid2', val: null } },
      { name: 'SET_LIST_DELETE', payload: { index: 1, bool: false } },
      { name: 'REMOVE_LIST', payload: 1 }
    ], done)

    clock.tick(5000)
  })

  it('does nothing when only list', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        tasks: [
          {
            _id: 'listid',
            list: 'List 1',
            current: true,
            _deleting: false,
            items: [
              {
                _id: 'itemid',
                item: 'Item 1'
              }
            ]
          }
        ]
      }
    }
    testAction(listActions.deleteList, { index: 0 }, state, [], done)

    clock.tick(5000)
  })

  it('undoes deletion methods when only list (multiple deletions)', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      currentList: 'listid',
      user: {
        tasks: [
          {
            _id: 'listid',
            list: 'List 1',
            currentItem: 'itemid',
            _deleting: false,
            items: [
              {
                _id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            _id: 'listid2',
            list: 'List 2',
            currentItem: 'itemid2',
            _deleting: false,
            items: [
              {
                _id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }

    testAction(listActions.deleteList, { index: 0 }, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid', val: 13 } },
      { name: 'SET_LIST_DELETE', payload: { index: 0, bool: true } },
      { name: 'SET_CURRENT_LIST', payload: state.user.tasks[1] },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid', val: null } },
      { name: 'SET_LIST_DELETE', payload: { index: 0, bool: false } },
      { name: 'REMOVE_LIST', payload: { index: 0 } }
    ], done)

    clock.tick(1000)

    testAction(listActions.deleteList, { index: 1 }, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid2', val: 5 } },
      { name: 'SET_LIST_DELETE', payload: { index: 1, bool: true } },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid2', val: null } },
      { name: 'SET_LIST_DELETE', payload: { index: 1, bool: false } }
    ], done)

    clock.tick(5000)
  })

  it('undoes list deletion mutations when _delete', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        tasks: [
          {
            _id: 'listid',
            list: 'List 1',
            current: false,
            _deleting: true,
            items: [
              {
                _id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            _id: 'listid2',
            list: 'List 2',
            current: true,
            _deleting: false,
            items: [
              {
                _id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      },
      deleteQueue: {
        listid: 5
      }
    }
    testAction(listActions.deleteList, { index: 0 }, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid', val: null } },
      { name: 'SET_LIST_DELETE', payload: { index: 0, bool: false } }
    ], done)
  })

  it('dispatches ADD_LIST on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, perm, cb) {
          cb(new Error('Error!'), { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username',
        tasks: [
          {
            _id: 'listid',
            list: 'List 1',
            _deleting: false,
            items: [
              {
                _id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            _id: 'listid2',
            list: 'List 2',
            _deleting: false,
            items: [
              {
                _id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }

    testAction(listActions.deleteList, { index: 0 }, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid', val: 14 } },
      { name: 'SET_LIST_DELETE', payload: { index: 0, bool: true } },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'listid', val: null } },
      { name: 'SET_LIST_DELETE', payload: { index: 0, bool: false } },
      { name: 'REMOVE_LIST', payload: { index: 0 } },
      { name: 'ADD_LIST', payload: state.user.tasks[0] }
    ], done)

    clock.tick(5000)
  })
})
