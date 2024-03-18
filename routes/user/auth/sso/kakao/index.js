const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
const userController = require('../../../../../controllers/user')

if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == '') {
    passport.use('kakao', new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/user/auth/sso/kakao/callback',     // 위에서 설정한 Redirect URI
    }, async (accessToken, refreshToken, profile, done) => {
        //console.log(profile);
        console.log("accessToken : ", accessToken);
        console.log("refreshToken : ", refreshToken);

        done();
    }))

    router.get('/', passport.authenticate('kakao'));

    router.get('/callback', passport.authenticate('kakao', {
        failureRedirect: '/',
    }), (res, req) => {

        //res.redirect('/auth');
    });

    router.get('/profile', userController.getKakaoUserInfo)

}


router.post('/signin', userController.doKakaoSignIn)

module.exports = router;