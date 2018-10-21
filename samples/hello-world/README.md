# Cloud Bigtable Hello World

This is a simple application that demonstrates using the Google Cloud Client
Library for Node.js to connect to and interact with Cloud Bigtable.

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Downloading the sample](#downloading-the-sample)
- [Costs](#costs)
- [Before you begin](#before-you-begin)
  - [Installing Node dependencies](#installing-node-dependencies)
  - [Creating a project in the GCP Console](#creating-a-project-in-the-gcp-console)
  - [Enabling billing for your project](#enabling-billing-for-your-project)
  - [Enable the Cloud Bigtable APIs](#enable-the-cloud-bigtable-apis)
  - [Install the Google Cloud SDK](#install-the-google-cloud-sdk)
  - [Get credentials](#get-credentials)
- [Creating an instance](#creating-an-instance)
- [Running the application](#running-the-application)
- [Cleaning up](#cleaning-up)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Downloading the sample

Download the sample app and navigate into the app directory:

1.  Clone the [Cloud Bigtable Node.js repository][github-repo] to your machine:

        git clone https://github.com/googleapis/nodejs-bigtable.git

    Alternatively, you can [download the sample][github-zip] as a zip file and
    extract it.

1.  Change to the Hello World code sample directory:

        cd nodejs-bigtable/samples/hello-world

[github-repo]: https://github.com/googleapis/nodejs-bigtable
[github-zip]: https://github.com/googleapis/nodejs-bigtable/archive/master.zip


## Costs

This sample uses billable components of Google Cloud Platform, including:

+   Cloud Bigtable

Use the [Pricing Calculator][bigtable-pricing] to generate a cost estimate
based on your projected usage.  New GCP users might be eligible for a [free
trial][free-trial].

[bigtable-pricing]: https://cloud.google.com/products/calculator/#id=1eb47664-13a2-4be1-9d16-6722902a7572
[free-trial]: https://cloud.google.com/free-trial


## Before you begin

This sample requires [Node.js][node] 8.0 or later.

[node]: https://nodejs.org

### Installing Node dependencies

Run the following command to download the sample's dependencies:

    npm install

### Creating a project in the GCP Console

If you haven't already created a project, create one now. Projects enable you
to manage all GCP resources for your app, including
deployment, access control, billing, and services.

1. Open the [GCP Console][cloud-console].
1. In the drop-down menu at the top, select **Create a project**.
1. Give your project a name.
1. Make a note of the project ID, which might be different from the project
   name. The project ID is used in commands and in configurations.

[cloud-console]: https://console.cloud.google.com/

### Enabling billing for your project

If you haven't already enabled billing for your project, [enable
billing][enable-billing] now. You must enable billing to use Cloud Bigtable.

[enable-billing]: https://console.cloud.google.com/projectselector/settings

### Enable the Cloud Bigtable APIs

Make sure to [enable the Cloud Bigtable APIs][enable-bigtable-api].

[enable-bigtable-api]: https://console.cloud.google.com/flows/enableapi?apiid=bigtable,bigtableadmin.googleapis.com

### Install the Google Cloud SDK

If you haven't already installed the Google Cloud SDK, [install it
now][cloud-sdk], and be sure to run `gcloud init` to [initialize the Cloud
SDK][cloud-sdk-init]. The SDK contains tools and libraries that enable you to
create and manage resources on GCP.

[cloud-sdk]: https://cloud.google.com/sdk/
[cloud-sdk-init]: https://cloud.google.com/sdk/docs/initializing

### Get credentials

To handle authentication, [create a service account][service-account], and set
the `GOOGLE_AUTHENTICATION_CREDENTIALS` environment variable to point to your
service account key.

[service-account]: https://cloud.google.com/docs/authentication/getting-started


## Creating an instance

Follow the instructions in the [user
documentation](https://cloud.google.com/bigtable/docs/creating-instance) to
create a GCP project and Cloud Bigtable instance if necessary. You'll need to
use your Cloud Bigtable instance ID to run the application.


## Running the application

Run the sample using Node.js. Replace `BIGTABLEINSTANCE` with the instance ID
you chose.

    INSTANCE_ID=BIGTABLEINSTANCE node index.js

The sample logs the following output to the console, along with informational
logs from the client library:

    Creating table Hello-Bigtable
    Write some greetings to the table
    Reading a single row by row key
      Read: Hello World!
    Reading the entire table
      Read: Hello World!
      Read: Hello Bigtable!
      Read: Hello Node!
    Delete the table


## Cleaning up

To avoid incurring extra charges to your GCP account, remove the resources
created for this sample.

1.  Go to the [Cloud Bigtable instance
    page](https://console.cloud.google.com//projectselector/bigtable/instances)
    in the GCP Console.

1.  Click the instance name.

1.  Click **Delete instance**.

1. Type the instance ID, then click **Delete** to delete the instance.
