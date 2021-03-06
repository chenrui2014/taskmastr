/* global describe it sinon beforeEach afterEach */
import chai from 'chai'
import { testAction } from '../../test-action'
import itemActionsInjector from 'inject-loader!../../../../src/store/item-store/item-actions' // eslint-disable-line import/no-webpack-loader-syntax

chai.should()

describe('completeTask', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.parse(2016, 1, 1, 6, 0, 0))
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches SET_TASK_COMPLETE and SORT_TASKS with another complete', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
          cb(null, { success: true })
        }
      },
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          }
        ]
      }
    }
    testAction(itemActions.completeTask, { index: 0, bool: true }, state, [
      { name: 'SET_TASK_COMPLETE', payload: { index: 0, bool: true } },
      { name: 'SET_DATE_COMPLETED', payload: { index: 0, date: '2016-01-01T00:00:00.000Z' } },
      { name: 'SET_COMPLETED_BY', payload: { index: 0, username: 'username' } },
      { name: 'SET_TASK_DUE_DATE', payload: { index: 0, date: null } },
      { name: 'SET_DUE_DATE_DIFFERENCE', payload: { index: 0, n: null } },
      { name: 'SORT_TASKS', payload: { oldIndex: 0, newIndex: 0 } }
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON on true without another complete', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
          cb(null, { success: true })
        }
      },
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: false
          }
        ]
      }
    }

    testAction(itemActions.completeTask, { index: 0, bool: true }, state, [
      { name: 'SET_TASK_COMPLETE', payload: { index: 0, bool: true } },
      { name: 'SET_DATE_COMPLETED', payload: { index: 0, date: '2016-01-01T00:00:00.000Z' } },
      { name: 'SET_COMPLETED_BY', payload: { index: 0, username: 'username' } },
      { name: 'SET_TASK_DUE_DATE', payload: { index: 0, date: null } },
      { name: 'SET_DUE_DATE_DIFFERENCE', payload: { index: 0, n: null } },
      { name: 'SORT_TASKS', payload: { oldIndex: 0, newIndex: 1 } }
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON on false', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
          cb(null, { success: true })
        }
      },
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: true,
            completedBy: 'username'
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true
          }
        ]
      }
    }

    testAction(itemActions.completeTask, { index: 0, bool: false }, state, [
      { name: 'SET_TASK_COMPLETE', payload: { index: 0, bool: false } },
      { name: 'SET_DATE_COMPLETED', payload: { index: 0, date: null } },
      { name: 'SET_COMPLETED_BY', payload: { index: 0, username: null } },
      { name: 'SORT_TASKS', payload: { oldIndex: 0, newIndex: 0 } }
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON when after another complete', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
          cb(null, { success: true })
        }
      },
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: true
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true
          }
        ]
      }
    }
    testAction(itemActions.completeTask, { index: 1, bool: true }, state, [
      { name: 'SET_TASK_COMPLETE', payload: { index: 1, bool: true } },
      { name: 'SET_DATE_COMPLETED', payload: { index: 1, date: '2016-01-01T00:00:00.000Z' } },
      { name: 'SET_COMPLETED_BY', payload: { index: 1, username: 'username' } },
      { name: 'SET_TASK_DUE_DATE', payload: { index: 1, date: null } },
      { name: 'SET_DUE_DATE_DIFFERENCE', payload: { index: 1, n: null } },
      { name: 'SORT_TASKS', payload: { oldIndex: 1, newIndex: 0 } }
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, etc., and undoes, on error', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
          cb(new Error('Error!'), { status: 500 })
        }
      },
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(new Error('Error!'), { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          }
        ]
      }
    }
    testAction(itemActions.completeTask, { index: 0, bool: true }, state, [
      { name: 'SET_TASK_COMPLETE', payload: { index: 0, bool: true } },
      { name: 'SET_DATE_COMPLETED', payload: { index: 0, date: '2016-01-01T00:00:00.000Z' } },
      { name: 'SET_COMPLETED_BY', payload: { index: 0, username: 'username' } },
      { name: 'SET_TASK_DUE_DATE', payload: { index: 0, date: null } },
      { name: 'SET_DUE_DATE_DIFFERENCE', payload: { index: 0, n: null } },
      { name: 'SORT_TASKS', payload: { oldIndex: 0, newIndex: 0 } },
      { name: 'SET_TASK_COMPLETE', payload: { index: 0, bool: false } },
      { name: 'SET_DATE_COMPLETED', payload: { index: 0, date: null } },
      { name: 'SET_COMPLETED_BY', payload: { index: 0, username: null } },
      { name: 'SORT_TASKS', payload: { oldIndex: 0, newIndex: 0 } }
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, etc., and undoes, on error (previously complete)', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
          cb(new Error('Error!'), { status: 500 })
        }
      },
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(new Error('Error!'), { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: true,
            completedBy: 'username',
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          }
        ]
      }
    }
    testAction(itemActions.completeTask, { index: 0, bool: false }, state, [
      { name: 'SET_TASK_COMPLETE', payload: { index: 0, bool: false } },
      { name: 'SET_DATE_COMPLETED', payload: { index: 0, date: null } },
      { name: 'SET_COMPLETED_BY', payload: { index: 0, username: null } },
      { name: 'SORT_TASKS', payload: { oldIndex: 0, newIndex: 0 } },
      { name: 'SET_TASK_COMPLETE', payload: { index: 0, bool: true } },
      { name: 'SET_DATE_COMPLETED', payload: { index: 0, date: '2016-01-01T00:00:00.000Z' } },
      { name: 'SET_COMPLETED_BY', payload: { index: 0, username: 'username' } },
      { name: 'SORT_TASKS', payload: { oldIndex: 0, newIndex: 0 } }
    ], done)
  })
})
