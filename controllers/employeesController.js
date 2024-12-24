let employeesData = require('../models/employees.json')

const getEmployees = (req, res, next) => {
	if (req.params.id) {
		res.status(200).json({
			sucess: true,
			data: employeesData.find(
				employe => employe.id === Number(req.params.id)
			),
		})
	} else if (employeesData.length > 0) {
		res.status(200).json({
			sucess: true,
			data: employeesData,
		})
	} else {
		res.status(404).json({
			sucess: false,
			data: 'No employees found.',
		})
	}
	next()
}

const addEmployees = (req, res, next) => {
	const { id, firstname, lastname } = req.body
	if (!firstname || !lastname) {
		res.status(400).json({
			sucess: false,
			data: 'Please provide firstname and lastname.',
		})
	} else {
		employeesData = [
			...employeesData,
			{
				id: id ? id : employeesData.length + 1,
				firstname: firstname,
				lastname: lastname,
			},
		]
		res.status(201).json({
			sucess: true,
			data: employeesData,
		})
	}
	next()
}

const updateEmployees = (req, res, next) => {
	const id = Number(req.params.id)
	const { firstname, lastname } = req.body
	if (!id || !employeesData.find(employe => employe.id === id)) {
		res.status(404).json({
			sucess: false,
			data: 'Pleasr provide a valid id.',
		})
	} else {
		employeesData = employeesData.map(employe => {
			return employe.id === id
				? {
						...employe,
						firstname: firstname,
						lastname: lastname,
				  }
				: employe
		})
		res.status(200).json({
			sucess: true,
			data: employeesData,
		})
	}
	next()
}

const deleteEmployees = (req, res, next) => {
	const id = Number(req.params.id)
	if (!id || !employeesData.find(employe => employe.id === id)) {
		res.status(404).json({
			sucess: false,
			data: 'Pleasr provide a valid id.',
		})
	} else {
		employeesData = employeesData.filter(employe => employe.id !== id)
		res.status(200).json({
			sucess: true,
			data: employeesData,
		})
	}
	next()
}

module.exports = {
	getEmployees,
	addEmployees,
	updateEmployees,
	deleteEmployees,
}
