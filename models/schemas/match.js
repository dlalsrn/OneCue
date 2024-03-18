const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('match', {
        billiard_room_name: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        billiard_room_lat: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        billiard_room_lng: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        billiard_room_address: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        start_date_day: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        finish_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        finish_date_day: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ball_type: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        recruit_num: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        apply_cost: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        notes: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: ""
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    schema.associate = models => {
        models.match.belongsTo(models.user, {
            foreignKey: 'host_user_id',
            onDelete: "CASCADE",
        })

        models.match.hasMany(models.apply, {
            foreignKey: 'match_id',
            onDelete: "CASCADE",
        })

        models.match.hasMany(models.match_report, {
            foreignKey: 'match_id',
            onDelete: "CASCADE",
        })
        models.match.hasOne(models.chat_room, {
            foreignKey: 'match_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})