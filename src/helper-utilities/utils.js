import _ from 'lodash'

export function isProduction () {
  return process.env.NODE_ENV === 'production'
}

export function isCurrent (thing, currentThing) {
  return thing._id === currentThing
}

export function findCurrent (things, currentThing) {
  return _.find(things, { _id: currentThing })
}

export function findCurrentIndex (things, currentThing) {
  return _.findIndex(things, { _id: currentThing })
}

export function findById (things, id) {
  return _.find(things, { _id: id })
}

export function findIndexById (things, id) {
  return _.findIndex(things, { _id: id })
}
