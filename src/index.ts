import {  Connect }                 from './sdk';
import {  TokenResponse }           from './sdk';
import {  AuthorizationResponse }   from './sdk';

module.exports = new Connect();

// const CLIENT_ID = '1_2kazv0v7xrs444kcgss044s080o80w84co8o0coc0cg4ko0okc';
// const CLIENT_SECRET = '6cmwgzlkgx0kg4wkcs4gk0o0owgc80k44cs0cc8g8sgko40ckc';
// const REDIRECT_URI = 'http://ambroise-pigne.com';
//
// connect.OAuth()
//     .initialize({ redirectUri: REDIRECT_URI, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET });
//
// connect.OAuth()
//     .getToken({ state: 'amyPeronsStae', scope: [] })
//     .then((res: TokenResponse) => {
//         // console.log(res.isSuccessful());
//         console.log(res);
//     });
//
// console.log(connect.OAuth().getLoginUrl());
//
//
// connect.OAuth().showLoginPrompt();
