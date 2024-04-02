const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const {
  COLLECTION_NAME,
  SCHEMA,
  MONGO_URI,
  DB_NAME,
  INDEX,
} = require('./appconfig.json')
const { getFilter } = require('./utils.js')

const app = express()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')))

// define schema
const SchemaDocumenti = new mongoose.Schema(
  { SCHEMA },
  {
    collection: COLLECTION_NAME,
  }
)

//define indexes
SchemaDocumenti.index(INDEX)

// define model
const DocumetsModel = mongoose.model(
  COLLECTION_NAME, // nome delle collection
  SchemaDocumenti // schema della collection
)

app.get('/api/data', async (req, res) => {
  // make filter for the query
  const { filter, page, limit } = getFilter(req.query)
  const skip = (page - 1) * limit

  // query
  const results = await DocumetsModel.aggregate([
    { $match: filter }, // Apply filtering criteria
    // Other sorting/filtering stages as needed
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }], // Get limited data with skip and limit
        total: [{ $count: 'total' }], // Count all documents matching criteria
      },
    },
  ])

  // extract data from query
  const data = results[0].data
  const total = results[0].total[0] ? results[0].total[0].total : 0

  // response
  const response = {
    rows: data,
    colls: Object.keys(SCHEMA),
    page,
    num_of_documents: total,
    num_of_pages: Math.ceil(total / limit),
  }

  res.json(response)
})

// All other requests return the React app, so it can handle routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  try {
    mongoose.connect(`${MONGO_URI}${DB_NAME}`)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(err)
  }
  console.log(`Server is listening http://localhost:${port}`)
  // console.log(getFilter())
})
