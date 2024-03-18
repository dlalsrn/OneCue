const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('chat_message', {
        message: {
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
        models.chat_message.belongsTo(models.chat_room, {
            foreignKey: 'chat_room_id',
            onDelete: "CASCADE",
        })
        models.chat_message.belongsTo(models.user, {
            foreignKey: 'send_user_id',
            onDelete: "CASCADE",
        })

        models.chat_message.hasMany(models.chat_message_view, {
            foreignKey: 'message_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})