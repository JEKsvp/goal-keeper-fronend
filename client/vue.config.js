const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:5000'
            }
        }
    }
}