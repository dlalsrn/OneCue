const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('location', {

        name: {
            type: Sequelize.STRING(10),
            allowNull : false,

        },
        depth: {
            type: Sequelize.TINYINT,
            allowNull : false,

        },      
        parent_id: {
            type: Sequelize.BIGINT,
            allowNull : true,
        },

    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    return schema;


})

    
