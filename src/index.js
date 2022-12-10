#! /usr/bin/env node
// Create service client module using ES6 syntax.
import { Command } from 'commander';
import presignURL from "./commands/createPresignURL.js";
const program = new Command();

program
  .name('awsS3PresignURL')
  .description('CLI to create a presigned URL for S3')
  .version('0.1.0');

program.description('Create a presigned URL for S3 to Get, Upload or Delete an object')
  .requiredOption('-b, --bucket <string>', 'Bucket Name')
  .requiredOption('-k, --key <string>', 'Object key')
  .option('-e, --expiration <number>', 'presign URL expiration in seconds deafult 3600', 3600)
  .option('-m, --method <string>', 'Define a method for the presigned URL (GET PUT DELETE)', 'GET')
  .option('-r, --region <string>', 'Define a custom region')
  .action(async (opts) => {
      if (typeof(opts.bucket) !== 'string' ) {
        throw new Error('Bucket name must be a string');
      }
      if (typeof(opts.key) !== 'string' ) {
        throw new Error('Object key must be a string');
      }
      opts.expiration = parseInt(opts.expiration);
      if (typeof(opts.expiration) !== 'number' || isNaN(opts.expiration) ) {
        throw new Error('expiration must be a number :');
      }
        try {
          await presignURL({bucket: opts.bucket, key: opts.key, expiration: opts.expiration, method: opts.method, region: opts.region});
        } catch (error) {
          console.error(error);
        }
    }
  );

program.parse();
