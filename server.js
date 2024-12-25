require('dotenv').config()
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const eventLogger = require('./middleware/eventLogger')
const corsOptions = require('./config/corsOptions')
const accessLogStream = require('./config/accessLogStream')
const rootRouter = require('./routes/root')
const employeesRouter = require('./routes/apis/employeesRouter')
const usersRouter = require('./routes/usersRouter')
const verifyJWT = require('./middleware/verifyJWT')
const refreshTokenRoute = require('./routes/refreshTokenRoute')

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

//middleware for cookies
app.use(cookieParser())

//routes
app.use('/', rootRouter)
//user register and login
app.use('/users', usersRouter)
//employees controls
app.use('/api/employees', [verifyJWT, employeesRouter])
//access token refresh using refresh token
app.use('/refresh', refreshTokenRoute)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
