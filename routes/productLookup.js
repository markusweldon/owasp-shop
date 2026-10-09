/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const utils = require('../lib/utils')
const models = require('../models/index')

module.exports = function productLookup () {
  return (req, res, next) => {
    const id = req.query.id === 'undefined' ? '' : req.query.id || ''
    models.sequelize.query(`SELECT * FROM Products WHERE id = ${id} AND deletedAt IS NULL`)
      .then(([products]) => {
        res.json(utils.queryResultToJson(products))
      }).catch(error => {
        next(error)
      })
  }
}
