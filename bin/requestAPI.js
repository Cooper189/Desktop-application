const {net} = require('electron');

class RequestAPI {
  constructor(properties) {
    this._properties = properties;
  }

  setParams(options) {
    this._params = Object.assign(this._properties, options);
    return this;
  }
  sendRequest(callback, requestBody = null) {
    const request = net.request(this._params);
    request.on('response', response => {
      response.on('data', chunk => {
        if (callback) callback(chunk);
      });
    });
    request.end(requestBody);
  }
}

module.exports = RequestAPI;