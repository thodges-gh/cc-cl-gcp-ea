let request = require('request');

exports.gcpservice = (req, res) => {
    let url = "https://min-api.cryptocompare.com/data/";
    const endpoint = req.body.data.endpoint || "";
    url = url + endpoint;
    const fsyms = req.body.data.fsyms || "";
    const fsym = req.body.data.fsym || "";
    const tsyms = req.body.data.tsyms || "";
    const tsym = req.body.data.tsym || "";
    const exchange = req.body.data.exchange || "";
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
        if (error || response.statusCode >= 400) {
            let errorData = {
                jobRunID: req.body.id,
                status: "errored",
                error: error
            }
            res.status(response.statusCode).send(errorData);
        } else {
            let returnData = {
                jobRunID: req.body.id,
                data: body
            }
            res.status(response.statusCode).send(returnData);
        }
    });
};