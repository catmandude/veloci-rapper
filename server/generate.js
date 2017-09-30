import fs from 'fs';

export default (req, res, next) => {
  const body = JSON.parse(Object.keys(req.body)[0]);
  const output = [].concat({
    purpose: 'Create regional lambdas',
    call: '',
    arguments: '',
  })
    .concat({
      purpose: 'Create personal lambdas',
      call: '',
      arguments: '',
    })
    .concat({
      purpose: 'Create person dbs',
      call: '',
      arguments: '',
    })
    .concat({
      purpose: 'Create API gateway',
      call: '',
      arguments: '',
    })
    .concat({
      purpose: 'Create VPC (Virtual Private Cloud)',
      call: `
      import {ec2} from 'EC2';
      let vpc = undefined;
      ec2.createDefaultVpc({DryRun:true},(error,data)=>{
          if(error==='DryRunOperation')
            ec2.createDefaultVpc({DryRun:false},(error,data)=>{
                vpc = data.vpc;
                //use ec2.createDhcpOptions,createInternetGateway, etc
                //consider using creatVpc instead of default
            })
          else
            throw new Error('no permissions');
      })
      `,
      arguments: '',
      notes: `
      http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#createDefaultVpc-property
      this step may be optional, simply updating data inside existing VPC may be suffecient.
      `,
    })
    .concat({
      purpose: 'Get code from S3 source',
      call: `
      import {s3} from 'S3';
      const html = s3.getObject({Bucket: *bucketName*/client, Key: index.html}).createReadStream();
      const clientJs = s3.getObject({Bucket: *bucketName*/client, Key: bundle.js}).createReadStream();
      const regionalL = s3.getObject({Bucket: *bucketName*/regional, Key: bundle.js}).createReadStream();
      const userL = s3.getObject({Bucket: *bucketName*/user, Key: bundle.js}).createReadStream();
      `,
      arguments: '',
      notes: 'use the file streams provided to pipe or read out code for the lamda\'s and client',
    });

  fs.writeFile('mammal.json', JSON.stringify(output, null, 2), err => {
    if (err) throw err;
    console.log('The file has been saved!');
    res.sendStatus(200);
  });
  // create a lambda
  // create a db
  // configure lambda // configure DB
  // create s3 bucket and write to it / read from it
  // read from github
  // tie all AWS
  // Build SAM thing

  // Get mammal code
  // push SAM to Cloud Formation
  // Call SDK for DB
  // Push Mammal to S3
  // Respond to Trike that all went well or not
  // DO WE NEED ANYTHING ELSE
};
