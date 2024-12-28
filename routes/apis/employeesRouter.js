const express = require('express')
const {
	getEmployees,
	addEmployees,
	updateEmployees,
	deleteEmployees,
} = require('../../controllers/employeesController')
const { verifyRoles } = require('../../middleware/verifyRoles')
const { Admin, Editor, User } = require('../../config/roles_list')

const router = express.Router()

router
	.route('/')
	.get(verifyRoles(User), getEmployees)
	.post(verifyRoles(Admin, Editor), addEmployees)

router
	.route('/:id')
	.get(verifyRoles(User), getEmployees)
	.put(verifyRoles(Admin, Editor), updateEmployees)
	.delete(verifyRoles(Admin), deleteEmployees)

module.exports = router
