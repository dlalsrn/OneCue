const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('match_report', {
        title: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        article: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    schema.associate = models => {
        models.match_report.belongsTo(models.user, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        models.match_report.belongsTo(models.match, {
            foreignKey: 'match_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})