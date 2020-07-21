const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, "../server/public/dist/"),
    devServer: {
        proxy: {
            '/': {
                ws: false,
                target: 'http://localhost:5000'
            }
        }
    }
}