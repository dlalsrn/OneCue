const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('user_profile', {
        nickname: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        profile_img: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        place_si: {
            type: Sequelize.STRING(8),
            allowNull: false,
        },
        place_gu: {
            type: Sequelize.STRING(8),
            allowNull: false,
        },
        score_t: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        score_f: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        game_style: {
            type: Sequelize.TEXT,
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    schema.associate = models => {
        //부모와의 관계를 맺는 belongsTo 메소드
        models.profile.belongsTo(models.user_auth, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})