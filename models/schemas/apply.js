const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('apply', {
        status: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    schema.associate = models => {
        models.apply.belongsTo(models.user, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        models.apply.belongsTo(models.match, {
            foreignKey: 'match_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})