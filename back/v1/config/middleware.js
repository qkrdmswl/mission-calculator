const RateLimit = require('express-rate-limit');

//* 사용량 제한 미들웨어
exports.apiLimiter = RateLimit({
   max: 9
});
