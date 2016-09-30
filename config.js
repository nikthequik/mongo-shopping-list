exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://nikthequik:W00dst0ck!@#@ds047146.mlab.com:47146/quikstore' :
                            'mongodb://nikthequik:W00dst0ck!@#@ds047146.mlab.com:47146/quikstore-dev');
exports.PORT = process.env.PORT || 8080;