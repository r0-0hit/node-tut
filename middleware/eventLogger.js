const fs = require('fs').promises
const path = require('path')
const { format } = require('date-fns')

// The issue is that the statusCode is being accessed from res (response object), but at the point where you are logging, the status might not have been set to 500 yet. This often happens if the logging middleware or function is executed before the response is finalized.

// To ensure you're capturing the correct status code, you should use the finish or close event of the response object. These events are triggered when the response is about to be sent to the client, ensuring the status code is finalized.

//https://chatgpt.com/share/676a8d15-3e7c-800c-afbe-f03ea234a875

const eventLogger = async (req, res, next) => {
	// console.log('in eventLogger ' + __dirname)

	// if (!(await fs.access(logsFolder))) {
	//     await fs.mkdir(logsFolder)
	// }

	res.on('finish', async () => {

		//req.url only gives the path of the URL (e.g., /1 or /api/employees/1), but it does not include the protocol, hostname, or port. To log the full URL, you need to use req.protocol, req.get('host'), and req.originalUrl.
		const logsFolder = path.join(__dirname, '..', '/logs')
		const filePath = path.join(logsFolder, 'logs.txt')
		const { method, headers } = req
		const { statusCode } = res
		const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`
		const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
		const message = `${dateTime} - ${method} - ${url} - ${headers.origin} - ${statusCode}\n`
		
		try {
			await fs.access(logsFolder)
		} catch {
			await fs.mkdir(logsFolder)
		}
		try {
			await fs.appendFile(filePath, message)
		} catch (error) {
			console.error(error)
		}
	})
	next()
}

module.exports = eventLogger
