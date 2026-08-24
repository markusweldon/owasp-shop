/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const { exec } = require('child_process')

module.exports = function logSearch () {
  return (req, res) => {
    const term = req.query.term

    // Search term is passed straight to a shell command with no escaping,
    // allowing arbitrary command injection via shell metacharacters.
    exec(`grep -i "${term}" logs/access.log`, (err, stdout, stderr) => {
      if (err) {
        res.status(500).json({ error: 'No matching log entries found' })
        return
      }
      res.status(200).json({ matches: stdout.split('\n').filter(Boolean) })
    })
  }
}
