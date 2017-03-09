/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import LoginForm from '../../../src/components/forms/LoginForm.vue'
import mountVm from '../../mount-vm'

describe('LoginForm.vue', function () {
  let clock
  let promise

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the auth property from the state', () => {
    const vm = mountVm(LoginForm)
    assert.isFalse(vm.auth)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(LoginForm)
    assert.isObject(vm.user)
  })

  it('should inherit the current property from the state', () => {
    const vm = mountVm(LoginForm)
    assert.isObject(vm.current)
  })

  it('should inherit the reset property from the state', () => {
    const vm = mountVm(LoginForm)
    assert.isFalse(vm.reset)
  })

  it('should inherit the forgot property from the state', () => {
    const vm = mountVm(LoginForm)
    assert.isFalse(vm.forgot)
  })

  it('should inherit the create property from the state', () => {
    const vm = mountVm(LoginForm)
    assert.isFalse(vm.create)
  })

  it('should inherit the rememberMe property from the state', () => {
    const vm = mountVm(LoginForm)
    assert.isFalse(vm.rememberMe)
  })

  it('should have a validate property', () => {
    const vm = mountVm(LoginForm)
    assert.deepEqual(vm.validate, { usernameEmail: false, usernameRequired: false, passwordRequired: false })
  })

  it('should have an isValid property', () => {
    const vm = mountVm(LoginForm)
    assert.isFalse(vm.isValid)
  })

  it('should have a loginUser method', () => {
    const vm = mountVm(LoginForm)
    assert.isFunction(vm.loginUser)
  })

  it('should inherit the setLoginAttempt method from the store', () => {
    const vm = mountVm(LoginForm)
    assert.isFunction(vm.setLoginAttempt)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(LoginForm)

    assert.strictEqual(vm.$el.getAttribute('id'), 'user-form')
    assert.isNotNull(vm.$el.querySelector('#user-line'))
    assert.isNotNull(vm.$el.querySelector('#key-line'))
    assert.isNotNull(vm.$el.querySelector('#remember-me'))
    assert.isNotNull(vm.$el.querySelector('#forgot-password'))
    assert.isNotNull(vm.$el.querySelector('#key-button'))
    assert.isNotNull(vm.$el.querySelector('#try-it-button'))
  })

  it('should log in to app if isValid', () => {
    const vm = mountVm(LoginForm, {
      auth: 'username@domain.com',
      current: {
        _id: 'listid'
      },
      user: {
        username: 'username@domain.com',
        key: 'password'
      }
    })
    promise = sinon.stub(vm, 'loginUser').returnsPromise()
    promise.resolves('username@domain.com')
    sinon.stub(vm.$router, 'push')

    vm.login('username@domain.com', 'password', false)
    clock.tick(250)

    assert.isTrue(vm.loginUser.calledWith({ username: 'username@domain.com', key: 'password', rememberMe: false }))
    assert.isTrue(vm.$router.push.calledWithMatch(/\/app\/list\/listid/))
    vm.$router.push.restore()
    vm.loginUser.restore()
  })

  it('should redirect to /create on !auth and create', () => {
    const vm = mountVm(LoginForm, {
      auth: false,
      create: true,
      user: {
        username: 'username@domain.com',
        key: 'password'
      }
    })
    promise = sinon.stub(vm, 'loginUser').returnsPromise()
    promise.resolves('username@domain.com')
    sinon.stub(vm.$router, 'push')

    vm.login('username@domain.com', 'password', false)
    clock.tick(250)

    assert.isTrue(vm.loginUser.calledWith({ username: 'username@domain.com', key: 'password', rememberMe: false }))
    assert.isTrue(vm.$router.push.calledWith('/create'))
    vm.$router.push.restore()
    vm.loginUser.restore()
  })

  it('should not log in to app on !isValid', () => {
    const vm = mountVm(LoginForm, {
      auth: '',
      user: {
        username: 'username',
        key: 'password'
      }
    })
    promise = sinon.stub(vm, 'loginUser').returnsPromise()
    promise.resolves('username@domain.com')
    sinon.stub(vm.$router, 'push')

    vm.login('username@domain.com', 'password', false)
    clock.tick(250)

    assert.isFalse(vm.loginUser.calledOnce)
    assert.isFalse(vm.$router.push.calledOnce)
    vm.$router.push.restore()
    vm.loginUser.restore()
  })

  it('should validate user.username as required', () => {
    const vm = mountVm(LoginForm, { user: {
      username: '',
      key: 'password'
    }})

    assert.isFalse(vm.validate.usernameRequired)
    assert.isFalse(vm.validate.usernameEmail)
    assert.isTrue(vm.validate.passwordRequired)
    assert.isFalse(vm.isValid)
  })

  it('should validate user.username as an email address', () => {
    const vm = mountVm(LoginForm, { user: {
      username: 'username',
      key: 'password'
    } })

    assert.isTrue(vm.validate.usernameRequired)
    assert.isFalse(vm.validate.usernameEmail)
    assert.isTrue(vm.validate.passwordRequired)
    assert.isFalse(vm.isValid)
  })

  it('should validate user.key as required', () => {
    const vm = mountVm(LoginForm, { user: {
      username: 'username@domain.com',
      key: ''
    } })

    assert.isTrue(vm.validate.usernameRequired)
    assert.isTrue(vm.validate.usernameEmail)
    assert.isFalse(vm.validate.passwordRequired)
    assert.isFalse(vm.isValid)
  })

  it('isValid should return true if validate is all true', () => {
    const vm = mountVm(LoginForm, { user: {
      username: 'username@domain.com',
      key: 'password'
    } })

    assert.isTrue(vm.validate.usernameRequired)
    assert.isTrue(vm.validate.usernameEmail)
    assert.isTrue(vm.validate.passwordRequired)
    assert.isTrue(vm.isValid)
  })

  it('should call setLoginAttempt on button push', () => {
    const vm = mountVm(LoginForm)
    sinon.stub(vm, 'setLoginAttempt')

    vm.$el.querySelector('#key-button').click()

    assert.isTrue(vm.setLoginAttempt.calledWith(true))
    vm.setLoginAttempt.restore()
  })
})
