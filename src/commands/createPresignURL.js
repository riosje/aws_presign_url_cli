import { S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand, PutObjectCommand, DeleteBucketCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers"; // ES6 import

export default async function presignURL({bucket, key, expiration, method, region}) {
    // Configure S3 client and Credentials
    const awsregion = region || process.env.AWS_REGION || null;

    const s3Client = new S3Client({ region: awsregion });
    const bucketParams = {
        Bucket: bucket,
        Key: key
    };

    // Define Method
    let command
    if (method === 'GET') {
        command = new GetObjectCommand(bucketParams);
    }
    else if (method === 'PUT') {
        command = new PutObjectCommand(bucketParams);
    }
    else if (method === 'DELETE') {
        command = new DeleteBucketCommand(bucketParams);
    }
    const putCommand = new PutObjectCommand(bucketParams);
    const getCommand = new GetObjectCommand(bucketParams);
    const deleteCommand = new DeleteBucketCommand(bucketParams);

    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: expiration,
        uriEscapePath: true
    });

    console.log({method, region, bucket, key, expiration, signedUrl});
}