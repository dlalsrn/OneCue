const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('user_auth ', {

        account: {
            type: Sequelize.STRING(30),
            allowNull : false,
        },
        password: {
            type: Sequelize.STRING(300),
            allowNull : false,
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull : false,
    
        },
        type: {
            type: Sequelize.TINYINT,
            allowNull : false,

        },
        provider: {
            type: Sequelize.STRING(1),
            allowNull : false,

        },
        provider_key: {
            type: Sequelize.TEXT,
            allowNull : true,
        },
        fcm_token: {
            type : Sequelize.TEXT,
            allowNull : false,
        }

    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    schema.associate = models => {
        models.user.hasmany(models.fcm_token, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        
        models.user.hasmany(models.user_info,{
            foreignKey: 'user_id',
            onDelete: "CASCADE", 
        })

        models.user.hasmany(models.user_profile, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })

        models.user.hasmany(models.ad_view_log, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        models.user.hasmany(models.auth_code, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        models.user.hasmany(models.apply, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        models.user.hasmany(models.chat_message, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        models.user.hasmany(models.chat_message_view, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })

    }
    return schema;
})