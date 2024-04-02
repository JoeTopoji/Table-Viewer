const { SCHEMA } = require('./appconfig.json')

const getFilter = (queryObj = {}) => {
  fields = Object.keys(SCHEMA)
  const filter = {}

  fields.forEach((field) => {
    if (queryObj[field]) filter[field] = queryObj[field].trim()
  })

  const { limit, page } = queryObj

  return { filter, page: Number(page) || 1, limit: Number(limit) || 10 }
}

module.exports = { getFilter }
