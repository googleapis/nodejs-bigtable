<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# Cloud Bigtable: Node.js Samples

[![Open in Cloud Shell][shell_img]][shell_link]

[Cloud Bigtable](https://cloud.google.com/bigtable/docs/) is Google&#x27;s NoSQL Big Data database service. It&#x27;s the same database that powers many core Google services, including Search, Analytics, Maps, and Gmail.

## Table of Contents

* [Before you begin](#before-you-begin)
* [Samples](#samples)
  * [Instances](#instances)

## Before you begin

Before running the samples, make sure you've followed the steps in the
[Before you begin section](../README.md#before-you-begin) of the client
library's README.

## Samples

### Instances

View the [source code][instances_0_code].

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigtable&page=editor&open_in_editor=samples/instances.js,samples/README.md)

__Usage:__ `node instances.js --help`

```
instances.js <command>

Commands:
  instances.js list  Lists all instances in the current project.

Options:
  --version  Show version number                                                                               [boolean]
  --help     Show help                                                                                         [boolean]

Examples:
  node instances.js list  Lists all instances in the current project.

For more information, see https://cloud.google.com/bigtable/docs
```

[instances_0_docs]: https://cloud.google.com/bigtable/docs/
[instances_0_code]: instances.js

[shell_img]: //gstatic.com/cloudssh/images/open-btn.png
[shell_link]: https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigtable&page=editor&open_in_editor=samples/README.md
