const {net} = require('electron');

class RequireAPI {
    constructor() {}

    setParams(options) {
        this.params = {
            method: options.method,
            protocol: 'http:',
            hostname: '127.0.0.1',
            port: 8000,
            path: options.path
        }
        return this
    }
    sendRequest( callback, requestBody=null) {
        const request = net.request(this.params);
        request.on('response', (response) => {
            response.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`)
                if (callback) callback(chunk)
            })
        })
        request.end(requestBody);
    }
}

module.exports = RequireAPI;