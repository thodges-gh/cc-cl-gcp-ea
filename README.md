# Chainlink CryptoCompare External Adapter

External adapter for use on Google Cloud Platform or AWS Lambda. Zip and upload, then use trigger URL as bridge endpoint.

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Create zip

```bash
zip -r cl-cc.zip .
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 8.10 for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-cc.zip` file
- Handler should remain index.handler
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-cc.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice