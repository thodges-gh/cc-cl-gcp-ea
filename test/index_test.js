const assert = require('chai').assert;
const createRequest = require('../index.js').createRequest;

describe('createRequest', () => {
  const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";

  context('with expected input', () => {
    const req = {
      id: jobID,
      data: {
        endpoint: "price",
        fsym: "ETH",
        tsyms: "USD"
      }
    };

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
		assert.isNotEmpty(data.data);
		assert.isNumber(data.result);
        done();
      });
    });
  });

  context('with bad input', () => {
    const badReq = {
      id: jobID,
      data: {
        endpoint: "price",
        fsym: "INVALID",
        tsyms: "INVALID"
      }
    };

    it('returns an error', (done) => {
      createRequest(badReq, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
		assert.equal(data.status, "errored");
		assert.isNotEmpty(data.errorMessage);
        done();
      });
    });
  });

  context('when endpoint is not specified', () => {
    const req = {
      id: jobID,
      data: {
        fsym: "ETH",
        tsyms: "USD"
      }
    };

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
		assert.isNotEmpty(data.data);
		assert.isNumber(data.result);
        done();
      });
    });
  });

  context('when using coin and market params', () => {
    const req = {
      id: jobID,
      data: {
        coin: "ETH",
        market: "USD"
      }
    };

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200);
        assert.equal(data.jobRunID, jobID);
		assert.isNotEmpty(data.data);
		assert.isNumber(data.result);
        done();
      });
    });
  });
});