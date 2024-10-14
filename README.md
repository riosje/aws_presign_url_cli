# aws_presign_url_cli
CLI to create presign URLs to Download or Upload files within an AWS S3 Bucket.
This is project was created because the AWS CLI is not capable the create `PUT` or `DELETE` presign URL it only provides the option to create GET presign URLs.

# Installation
Install the package globally
```SHELL
npm install -g aws_presign_url_cli
```


# CLI USAGE
```SHELL
aws_presign_url_cli <opts>
```

Full example
```SHELL
aws_presign_url_cli -b my_bucket -k "key/objectToUpload.zip" -e 50000 -m "PUT"
```

Upload a file with CURL using the presigned URL
```SHELL
curl ${PRESIGNED_URL} --upload-file key/objectToUpload.zip
```

## CLI AVAILABLE OPTIONS
|DESCRIPTION                                  |REQUIRED|PARAMETERS          |DEFAULT VALUE |DATA TYPE|
|---------------------------------------------|----------|------------------|--------------|---------|
|Bucket Name                                  |`YES`     |`-b, --bucket`    |              |`string` |
|Object key                                   |`YES`     |`-k, --key`       |              |`string` |
|presign URL expiration in seconds            |`NO`      |`-e, --expiration`|3600          |`number` |
|Method for the presigned URL (GET PUT DELETE)|`NO`      |`-m, --method`    |GET           |`string` |
|Define a custom region                       |`NO`      |`-r, --region`    |Default Region|`string` |


## AWS Credentials
This CLi uses under the hood the aws `credential-providers` which automatically identify the current credentials, [AWS Docs reference](https://docs.aws.amazon.com/sdkref/latest/guide/settings-reference.html)


# Build
When you build the project it generates an artifactoi with @vercel/ncc within the bin folder
```SHELL
npm ci
npm run build
```

# Test the PUT presgined URL Created
in the folder `StaticSiteUpload` there is a static site which you can use to upload a file with the specified presigned URL.

Also you can use an online version
https://riosje.github.io/aws_presign_url_cli/StaticSiteUpload/

<img width="472" alt="image" src="https://user-images.githubusercontent.com/55195249/206874626-8a14d2b7-5936-4f88-a3e8-5b8270c0874f.png">
