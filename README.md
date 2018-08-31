# Chainlink CryptoCompare External Adapter

Adapter for use on Google Cloud Platform. Upload Zip and use trigger URL as bridge endpoint.

## Install

```bash
npm install
```

Create zip:

```bash
zip -r cl-cc.zip .
```

## Test Cases (GCP test events)

Fail: 
{
  "id": "278c97ffadb54a5bbb93cfec5f7b5503",
  "data": {}
}

{"jobRunID":"278c97ffadb54a5bbb93cfec5f7b5503","data":{"Response":"Error","Message":"","Type":1,"Aggregated":false,"Data":[],"Path":"/data/","ErrorsSummary":"Not implemented"}}

Pass:
{
  "id": "278c97ffadb54a5bbb93cfec5f7b5503",
  "data": {
    "endpoint": "price",
    "fsym": "ETH",
    "tsyms": "USD"
  }
}

{
  "id": "278c97ffadb54a5bbb93cfec5f7b5503",
  "data": {
    "endpoint": "price",
    "fsym": "ETH",
    "tsyms": "USD,EUR,JPY"
  }
}

{
  "id": "278c97ffadb54a5bbb93cfec5f7b5503",
  "data": {
    "endpoint": "pricemulti",
    "fsyms": "BTC,ETH",
    "tsyms": "USD,EUR"
  }
}

{
  "id": "278c97ffadb54a5bbb93cfec5f7b5503",
  "data": {
    "endpoint": "pricemultifull",
    "fsyms": "BTC,ETH",
    "tsyms": "USD,EUR"
  }
}

{
  "id": "278c97ffadb54a5bbb93cfec5f7b5503",
  "data": {
    "endpoint": "generateAvg",
    "fsym": "ETH",
    "tsym": "USD",
    "exchange": "Kraken"
  }
}