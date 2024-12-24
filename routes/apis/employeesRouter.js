const express = require('express')
const {
	getEmployees,
	addEmployees,
	updateEmployees,
	deleteEmployees,
} = require('../../controllers/employeesController')

const router = express.Router()

router.route('/').get(getEmployees).post(addEmployees)

router
	.route('/:id')
	.get(getEmployees)
	.put(updateEmployees)
	.delete(deleteEmployees)

module.exports = router
