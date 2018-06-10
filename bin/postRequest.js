const {net} = require('electron');

const postRequest = (options, callback) => {
    let temp;
    const request = net.request({
        method: options.method,
        protocol: 'http:',
        hostname: '127.0.0.1',
        port: 8000,
        path: options.path,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    request.on('response', (response) => {
        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
            if (callback) callback(chunk)
        })
    })
    request.end(options.body);
}

module.exports = postRequest