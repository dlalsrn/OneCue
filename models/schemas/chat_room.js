const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('chat_room', {
        title: {
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
        models.chat_room.belongsTo(models.match, {
            foreignKey: 'match_id',
            onDelete: "CASCADE",
        })
        models.chat_room.hasMany(models.chat_message, {
            foreignKey: 'chat_room_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})