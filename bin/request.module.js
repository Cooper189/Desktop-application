const {net} = require('electron');

const sendRequest = (options, callback) => {
    let temp;
    const request = net.request({
        method: options.method,
        protocol: 'http:',
        hostname: '127.0.0.1',
        port: 8000,
        path: options.path
    })
    request.on('response', (response) => {
        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
            if (callback) callback(chunk)
        })
    })
    request.end();
}

module.exports = sendRequest