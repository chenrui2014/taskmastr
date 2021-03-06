/* global it describe sinon */
import { assert } from 'chai'
import ForgotVue from '../../src/components/ForgotVue.vue'
import mountVm from '../mount-vm'

describe('ForgotVue', function () {
  it('should inherit the authenticated property from the state', () => {
    const vm = mountVm(ForgotVue)
    assert.isFalse(vm.authenticated)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(ForgotVue)
    assert.isObject(vm.user)
  })

  it('should inherit the initialized property from the state', () => {
    const vm = mountVm(ForgotVue)
    assert.isFalse(vm.initialized)
  })

  it('should inherit the reset property from the state', () => {
    const vm = mountVm(ForgotVue)
    assert.isFalse(vm.reset)
  })

  it('should inherit the forgot property from the state', () => {
    const vm = mountVm(ForgotVue)
    assert.isFalse(vm.forgot)
  })

  it('should inherit the setForgot method from the store', () => {
    const vm = mountVm(ForgotVue)
    assert.isFunction(vm.setForgot)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(ForgotVue, { forgot: true, initialized: true })

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('.modal'))
    assert.isNotNull(vm.$el.querySelector('.forgot-form'))
  })

  it('should respond to changes in the state (initialized)', () => {
    const vm = mountVm(ForgotVue, { forgot: true, initialized: false })

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('.modal'))
  })

  it('should respond to changes in the state (authenticated and user.tasks)', () => {
    const vm = mountVm(ForgotVue, {
      forgot: true,
      initialized: true,
      authenticated: true,
      user: {
        tasks: [
          {
            list: 'List 1'
          }
        ]
      }
    })

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('.modal'))
  })

  it('should call setForgot if !forgot', () => {
    const vm = mountVm(ForgotVue, { forgot: false })
    sinon.stub(vm, 'setForgot')
    // Set the path and re-mount
    vm.$router.push('/forgot')
    vm.$mount()
    assert.isTrue(vm.setForgot.calledWith(true))

    vm.setForgot.restore()
  })
})
