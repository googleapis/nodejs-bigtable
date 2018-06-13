<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# [Cloud Bigtable: Node.js Client](https://github.com/googleapis/nodejs-bigtable)

[![release level](https://img.shields.io/badge/release%20level-alpha-orange.svg?style&#x3D;flat)](https://cloud.google.com/terms/launch-stages)
[![CircleCI](https://img.shields.io/circleci/project/github/googleapis/nodejs-bigtable.svg?style=flat)](https://circleci.com/gh/googleapis/nodejs-bigtable)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/github/googleapis/nodejs-bigtable?branch=master&svg=true)](https://ci.appveyor.com/project/googleapis/nodejs-bigtable)
[![codecov](https://img.shields.io/codecov/c/github/googleapis/nodejs-bigtable/master.svg?style=flat)](https://codecov.io/gh/googleapis/nodejs-bigtable)

> Node.js idiomatic client for [Cloud Bigtable][product-docs].

[Cloud Bigtable](https://cloud.google.com/bigtable/docs/) is Google&#x27;s NoSQL Big Data database service. It&#x27;s the same database that powers many core Google services, including Search, Analytics, Maps, and Gmail.


* [Cloud Bigtable Node.js Client API Reference][client-docs]
* [github.com/googleapis/nodejs-bigtable](https://github.com/googleapis/nodejs-bigtable)
* [Cloud Bigtable Documentation][product-docs]

Read more about the client libraries for Cloud APIs, including the older
Google APIs Client Libraries, in [Client Libraries Explained][explained].

[explained]: https://cloud.google.com/apis/docs/client-libraries-explained

**Table of contents:**

* [Quickstart](#quickstart)
  * [Before you begin](#before-you-begin)
  * [Installing the client library](#installing-the-client-library)
  * [Using the client library](#using-the-client-library)
* [Samples](#samples)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [License](#license)

## Quickstart

### Before you begin

1.  Select or create a Cloud Platform project.

    [Go to the projects page][projects]

1.  Enable billing for your project.

    [Enable billing][billing]

1.  Enable the Cloud Bigtable and Cloud Bigtable Admin APIs.

    [Enable the APIs][enable_api]

1.  [Set up authentication with a service account][auth] so you can access the
    API from your local workstation.

[projects]: https://console.cloud.google.com/project
[billing]: https://support.google.com/cloud/answer/6293499#enable-billing
[enable_api]: https://console.cloud.google.com/flows/enableapi?apiid=bigtable.googleapis.com,bigtableadmin.googleapis.com
[auth]: https://cloud.google.com/docs/authentication/getting-started

### Installing the client library
[embedmd]:# (samples/quickstart.js javascript /const Bigtable/ /}\)\(\);/)
```javascript
const Bigtable = require('@google-cloud/bigtable');

// The name of the Cloud Bigtable instance
const INSTANCE_NAME = 'my-bigtable-instance';
// The name of the Cloud Bigtable table
const TABLE_NAME = 'my-table';

(async () => {
  try {
    // Creates a Bigtable client
    const bigtable = new Bigtable();

    // Connect to an existing instance:my-bigtable-instance
    const instance = bigtable.instance(INSTANCE_NAME);

    // Connect to an existing table:my-table
    const table = instance.table(TABLE_NAME);

    // Read a row from my-table using a row key
    let [singleRow] = await table.row('r1').get();

    // Print the row key and data (column value, labels, timestamp)
    console.log(
      `Row key: ${singleRow.id}\nData: ${JSON.stringify(
        singleRow.data,
        null,
        4
      )}`
    );
  } catch (err) {
    // Handle error performing the read operation
    console.error(`Error reading row r1:`, err);
  }
})();
```
