const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON Response
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }))
// URL do frontend

// Public folder for images
app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)