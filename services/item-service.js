'use strict'

// const r = require('../r')
const List = require('../models/List')
const r = require('../thinky').r

exports.addItem = function (listid, item) {
  return List.get(listid).update({
    dateModified: new Date().toISOString(),
    items: r.row('items').prepend(item)
  }).run()
  .then((result) => ({ success: true }))
  .catch((err) => err)
}

exports.deleteItem = function (listid, index) {
  return List.get(listid).update({
    dateModified: new Date().toISOString(),
    items: r.row('items').deleteAt(index)
  }).run()
  .then((result) => ({ success: true }))
  .catch((err) => err)
}

exports.updateItem = function (listid, index, item) {
  return List.get(listid).update({
    dateModified: new Date().toISOString(),
    items: r.row('items').changeAt(index, item)
  }).run()
  .then((result) => ({ success: true }))
  .catch((err) => err)
}
