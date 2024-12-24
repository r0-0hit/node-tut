const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const eventLogger = require('./middleware/eventLogger')
const corsOptions = require('./utils/corsOptions')
const accessLogStream = require('./utils/accessLogStream')
const rootRouter = require('./routes/root')
const employeesRouter = require('./routes/apis/employeesRouter')

const app = express()
exports.app = app
const PORT = process.env.PORT || 5000

//static files
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.resolve(__dirname, 'public')))

//middleware
app.use(eventLogger)

//third part middleware
//morgan
app.use(
	morgan('tiny', {
		stream: accessLogStream,
	})
)
app.use(morgan('dev'))

//adding CORS(Cross Origin Resource Sharing)
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded data form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

//routes
app.use('/', rootRouter)
//employees controls
app.use('/api/employees', employeesRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
