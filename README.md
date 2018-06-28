<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# [Cloud Bigtable: Node.js Client](https://github.com/googleapis/nodejs-bigtable)

[![release level](https://img.shields.io/badge/release%20level-beta-yellow.svg?style&#x3D;flat)](https://cloud.google.com/terms/launch-stages)
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

    npm install --save @google-cloud/bigtable

### Using the client library

[embedmd]:# (samples/quickstart.js javascript /.*Imports/ /}\)\(\);/)
```javascript
// Imports the Google Cloud client library
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

## Samples

Samples are in the [`samples/`](https://github.com/googleapis/nodejs-bigtable/tree/master/samples) directory. The samples' `README.md`
has instructions for running the samples.

| Sample                      | Source Code                       | Try it |
| --------------------------- | --------------------------------- | ------ |
| Hello World | [source code](https://github.com/googleapis/nodejs-bigtable/blob/master/samples/hello-world/index.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigtable&page=editor&open_in_editor=samples/hello-world/index.js,samples/hello-world/README.md) |
| Instance operations | [source code](https://github.com/googleapis/nodejs-bigtable/blob/master/samples/instances.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigtable&page=editor&open_in_editor=samples/instances.js,samples/README.md) |
| Table operations | [source code](https://github.com/googleapis/nodejs-bigtable/blob/master/samples/tableadmin.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigtable&page=editor&open_in_editor=samples/tableadmin.js,samples/README.md) |

The [Cloud Bigtable Node.js Client API Reference][client-docs] documentation
also contains samples.

## Versioning

This library follows [Semantic Versioning](http://semver.org/).

This library is considered to be in **beta**. This means it is expected to be
mostly stable while we work toward a general availability release; however,
complete stability is not guaranteed. We will address issues and requests
against beta libraries with a high priority.

More Information: [Google Cloud Platform Launch Stages][launch_stages]

[launch_stages]: https://cloud.google.com/terms/launch-stages

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/googleapis/nodejs-bigtable/blob/master/.github/CONTRIBUTING.md).

## License

Apache Version 2.0

See [LICENSE](https://github.com/googleapis/nodejs-bigtable/blob/master/LICENSE)

[client-docs]: https://cloud.google.com/nodejs/docs/reference/bigtable/latest/
[product-docs]: https://cloud.google.com/bigtable/docs/
[shell_img]: //gstatic.com/cloudssh/images/open-btn.png
