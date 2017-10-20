<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# Google Cloud Bigtable: Node.js Samples

[![Build](https://storage.googleapis.com/.svg)]()

[Cloud Bigtable](https://cloud.google.com/bigtable/docs/) is Google&#x27;s NoSQL Big Data database service. It&#x27;s the same database that powers many core Google services, including Search, Analytics, Maps, and Gmail.

## Table of Contents

* [Before you begin](#before-you-begin)
* [Samples](#samples)
  * [Zones](#zones)

## Before you begin

Before running the samples, make sure you've followed the steps in the
[Before you begin section](../README.md#before-you-begin) of the client
library's README.

## Samples

### Instances

View the [source code][instances_0_code].

__Usage:__ `node instances.js --help`

```
Commands:
  list  Lists all instances in the current project.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node instances.js list  Lists all zones in the current project.

For more information, see https://cloud.google.com/bigtable/docs
```

[zones_0_docs]: https://cloud.google.com/bigtable/docs
[zones_0_code]: zones.js