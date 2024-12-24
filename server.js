const express = require('express')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const eventLogger = require('./middleware/eventLogger')
const app = express()

const PORT = process.env.PORT || 5000

//static files
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.resolve(__dirname, 'public')))

//middleware
// app.use(eventLogger)

//third part middleware
// app.use(morgan('tiny'))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, 'logs', 'access.log'),
	{ flags: 'a' }
)
app.use(
	morgan('short', {
		stream: accessLogStream,
	})
)
app.use(morgan('dev'))

app.get('/', (req, res) => {
	// console.log('logMorgan: ', logMorgan)

	res.sendFile(path.join(__dirname, 'public', 'home.html'))
})

app.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'about.html'))
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
