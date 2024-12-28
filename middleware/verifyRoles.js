const verifyRoles = (...allowedRoles) => {
	return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401)
        const isAllowed = req.roles.map(role => allowedRoles.includes(role)).find(val => val ===true)
        if (!isAllowed) return res.sendStatus(401)
		next()
	}
}

module.exports = { verifyRoles }
