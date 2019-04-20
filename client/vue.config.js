const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/': {
                ws: false,
                target: 'http://localhost:5000'
            }
        }
    }
}