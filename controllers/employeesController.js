const Employee = require('../models/Employee')
const mongoose = require('mongoose')

const getEmployees = async (req, res) => {
	// Validate the id
	if (req?.params?.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			message: `Invalid ID format: ${req.params.id}`,
		})
	}
	const employeesData = req.params?.id
		? await Employee.findById(req.params.id).exec()
		: await Employee.find()

	if (req.params?.id && !employeesData) {
		return res.status(404).json({
			sucess: false,
			data: `No employee found with id: ${req.params.id}`,
		})
	}
	if (!req.params?.id && employeesData.length > 0) {
		return res.status(200).json({
			sucess: true,
			data: employeesData,
		})
	} else {
		res.status(404).json({
			sucess: false,
			data: 'No employees found.',
		})
	}
}

const addEmployees = async (req, res) => {
	const { firstname, lastname } = req.body
	if (!firstname || !lastname) {
		res.status(400).json({
			sucess: false,
			data: 'Please provide firstname and lastname.',
		})
	} else {
		const newEmployee = {
			firstname: firstname,
			lastname: lastname,
		}
		const result = await Employee.create(newEmployee)
		res.status(201).json({
			sucess: true,
			data: result,
		})
	}
}

const updateEmployees = async (req, res) => {
	// Validate the id
	if (req?.params?.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			message: `Invalid ID format: ${req.params.id}`,
		})
	}
	const { id } = req.params
	const { firstname, lastname } = req.body
	const employe = await Employee.findById(id)
	if (!id || !employe) {
		return res.status(404).json({
			sucess: false,
			data: 'Pleasr provide a valid id.',
		})
	}
	if (!firstname || !lastname) {
		return res.status(204).json({
			sucess: false,
			data: 'Pleasr provide firstname and lastname.',
		})
	}
	employe.firstname = firstname
	employe.lastname = lastname
	await employe.save()
	res.status(200).json({
		sucess: true,
		data: employe,
	})
}

const deleteEmployees = async (req, res) => {
	// Validate the id
	if (req?.params?.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({
			message: `Invalid ID format: ${req.params.id}`,
		})
	}
	const id = req.params.id
	if (!id) {
		res.status(404).json({
			sucess: false,
			data: 'Pleasr provide a valid id.',
		})
	} else {
		const employee = await Employee.findOne({ _id: req.body.id }).exec()
		if (!employee) {
			return res.status(404).json({
				message: `No employee matches ID ${req.body.id}.`,
			})
		}
		const result = await employee.deleteOne() //{ _id: req.body.id }
		// const result = await Employee.deleteOne({ _id: id })
		res.status(200).json({
			sucess: true,
			data: result,
		})
	}
}

module.exports = {
	getEmployees,
	addEmployees,
	updateEmployees,
	deleteEmployees,
}
