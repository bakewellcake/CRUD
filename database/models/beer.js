var model = function (sequelize, datatypes) {
	var beer = sequelize.define('beer', {
		id: {
            type: datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: datatypes.STRING,
        company: datatypes.STRING,
        style: datatypes.STRING,
        percentage: datatypes.FLOAT(2),
        rating: datatypes.FLOAT(1)
    }, { freezeTableName: true , timestamps: false, schema: 'crud' })

	return beer
}

module.exports = model