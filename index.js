let request = require('request');

const createRequest = (input, callback) => {
    let url = "https://min-api.cryptocompare.com/data/";
    const endpoint = input.data.endpoint || "price";
	url = url + endpoint;
	const fsym = input.data.fsym || input.data.coin || "";
	const tsyms = input.data.tsyms || input.data.market || "";
	const tsym = input.data.tsym || input.data.market || "";
	const exchange = input.data.e || input.data.exchange || "";
    let queryObj = {
        fsym: fsym,
		tsyms: tsyms,
		tsym: tsym,
		e: exchange,
		apikey: process.env.API_KEY
    };
    for (let key in queryObj) {
        if (queryObj[key] === "") {
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
				error: body,
				errorMessage: body.Message,
                statusCode: response.statusCode
            });
        } else {
            callback(response.statusCode, {
                jobRunID: input.id,
				data: body,
				result: body[tsyms] || body[tsym] || body.RAW.PRICE,
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