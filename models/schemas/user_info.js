const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('user_info', {
        uID: {
            type: Sequelize.TEXT,
        },
        uPW: {
            type: Sequelize.TEXT,
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        phone_provider: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        phone_num: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        gender: {
            type: Sequelize.TINYINT,
            allowNull: true
        },
        birth: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    schema.associate = models => {
        models.user_info.belongsTo(models.user, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})