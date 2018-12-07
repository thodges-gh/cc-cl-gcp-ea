let request = require('request');

const createRequest = (input, callback) => {
    let url = "https://min-api.cryptocompare.com/data/";
    const endpoint = input.data.endpoint || "";
    url = url + endpoint;
    const fsyms = input.data.fsyms || "";
    const fsym = input.data.fsym || "";
    const tsyms = input.data.tsyms || "";
    const tsym = input.data.tsym || "";
    const exchange = input.data.exchange || "";
    let requestObj;
    switch (endpoint) {
        case "price":
            requestObj = {
                fsym: fsym,
                tsyms: tsyms
            }
            break;
        case "pricemulti":
        case "pricemultifull":
            requestObj = {
                fsyms: fsyms,
                tsyms: tsyms
            }
            break;
        case "generateAvg":
            requestObj = {
                fsym: fsym,
                tsym: tsym,
                e: exchange
            }
            break;
        default:
            requestObj = {
                fsym: fsym,
                tsyms: tsyms
            }
            break;
    }
    let options = {
        url: url,
        qs: requestObj,
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