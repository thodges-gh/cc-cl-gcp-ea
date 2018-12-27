let request = require('request');

const createRequest = (input, callback) => {
    let url = "https://min-api.cryptocompare.com/data/";
    const endpoint = input.data.endpoint || "";
    url = url + endpoint;
    let queryObj = {
        fsym: input.data.fsym,
        fsyms: input.data.fsyms,
        tsym: input.data.tsym,
        tsyms: input.data.tsyms,
        exchange: input.data.exchange
    }
    for (let key in queryObj) {
        if (typeof queryObj[key] === "undefined") {
            delete queryObj[key];
        }
    }
    const options = {
        url: url,
        qs: queryObj,
        json: true
    }
    request(options, (error, response, body) => {
        if (error || response.statusCode >= 400 || body.Response == "Error") {
            callback(response.statusCode, {
                jobRunID: input.id,
                status: "errored",
                error: body.Message,
                statusCode: response.statusCode
            });
        } else {
            callback(response.statusCode, {
                jobRunID: input.id,
                data: body,
                statusCode: response.statusCode
            });
        }
    });
}

exports.gcpservice = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data);
    });
};

exports.handler = (event, context, callback) => {
    createRequest(event, (statusCode, data) => {
        callback(null, data);
    });
}

module.exports.createRequest = createRequest;