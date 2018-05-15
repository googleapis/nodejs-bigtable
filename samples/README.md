<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# Cloud Bigtable: Node.js Samples

[![Open in Cloud Shell][shell_img]][shell_link]

[Cloud Bigtable](https://cloud.google.com/bigtable/docs/) is Google&#x27;s NoSQL Big Data database service. It&#x27;s the same database that powers many core Google services, including Search, Analytics, Maps, and Gmail.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Before you begin](#before-you-begin)
- [Samples](#samples)
  - [Hello World](#hello-world)
  - [Instances](#instances)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Before you begin

Before running the samples, make sure you've followed the steps in the
[Before you begin section](../README.md#before-you-begin) of the client
library's README.

## Samples

### Quickstart
The [Quick start](quickstart.js) sample shows a basic usage of the Bigtable client library: reading rows from a table.

Follow the [cbt tutorial](https://cloud.google.com/bigtable/docs/quickstart-cbt) to install the cbt command line tool.
Here are the cbt commands to create a table, column family and add some data:
```
   cbt createtable my-table
   cbt createfamily my-table cf1
   cbt set my-table r1 cf1:c1=test-value
```

Run the quick start to read the data you just wrote using `cbt`:
```
   node.js quickstart.js
```
Expected output similar to:
```
    Row key: r1
    Data: {
        "cf1": {
            "c1": [
                {
                    "value": "test-value",
                    "labels": [],
                    "timestamp": "1526104247827000"
                }
            ]
        }
    }
```

### Hello World

View the [Hello World][hello_world_directory] sample to see a basic usage of
the Bigtable client library.

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

### Table / Column family management

View the [source code](tableadmin.js).
This sample showcases the basic table / column family operations:
1. Create a table (if does not exist)
1. Retrieve table metadata
1. Create column families with supported garbage collection(GC) rules
1. List table column families and GC rules
1. Update a column family GC rule
1. Delete a column family
1. Delete a table

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigtable&page=editor&open_in_editor=samples/instances.js,samples/README.md)

__Usage:__ `node tableadmin.js --help`

```
Commands:
  tableadmin.js run     Create a table (if does not exist) and run basic table operations.
  tableadmin.js delete  Delete table.

Options:
  --version   Show version number                                                                              [boolean]
  --instance  Cloud Bigtable Instance name                                                                    [required]
  --table     Cloud Bigtable Table name                                                                       [required]
  --help      Show help                                                                                        [boolean]

Examples:
  node tableadmin.js run --instance [instanceName] --table      Create a table (if does not exist) and run basic table
  [tableName]                                                   operations.
  node tableadmin.js delete --instance [instanceName] --table   Delete a table.
  [tableName]

For more information, see https://cloud.google.com/bigtable/docs
```
[instances_0_docs]: https://cloud.google.com/bigtable/docs/
[instances_0_code]: instances.js

[hello_world_directory]: hello-world

[shell_img]: //gstatic.com/cloudssh/images/open-btn.png
[shell_link]: https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-bigtable&page=editor&open_in_editor=samples/README.md
