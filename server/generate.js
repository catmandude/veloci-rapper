import fs from 'fs';

export default (req, res) => {
  console.log('ran!');
  const body = JSON.parse(Object.keys(req.body)[0]);
  const output = [].concat({
    purpose: 'Create regional lambdas',
    call: `
    import AWS from 'aws-sdk';
    var params = {
      Code: {
        use S3 info from below
      },
      Description: 'Create a reagional lambda',
      FunctionName: createRegionalLambda,
      MemorySize: 128,
      Publish: true,
      Role: "arn:aws:iam::123456789012:role/service-role/*our role name*",
      Runtime: "nodejs4.3",
      Timeout: 15,
      VpcConfig: {
      }
     };
     ${
  Object.keys(body).map(region => `lambda.createFunction({...params, region:${region}, function(err, data) {
          if (err) console.log(err, err.stack);
          else     console.log(data);
         })`).join('\n\n')
}
    `,
    arguments: '',
  })
    .concat({
      purpose: 'Create personal lambdas',
      call: `
      import AWS from 'aws-sdk';
      var params = {
        Code: {
          use S3 info from below
        },
        Description: 'Create a personal lambda',
        FunctionName: createPersonalLambda,
        MemorySize: 128,
        Publish: true,
        Role: "arn:aws:iam::123456789012:role/service-role/*our role name*",
        Runtime: "nodejs4.3",
        Timeout: 15,
        VpcConfig: {
        }
       };
       ${
  Object.keys(body).map(region => `lambda.createFunction({...params, region:${region}, function(err, data) {
            if (err) console.log(err, err.stack);
            else     console.log(data);
           })`).join('\n\n')
}
      `,
      arguments: '',
    })
    .concat({
      purpose: 'Create person dbs',
      call: `
      var cloudformation = new AWS.CloudFormation();
      var params = {
          ChangeSetName: 'STRING_VALUE', /* required */
          ClientRequestToken: 'STRING_VALUE',
          StackName: 'STRING_VALUE'
      };
      cloudformation.executeChangeSet(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
      });
`,
      arguments: '',
      notes: 'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html',
    })
    .concat({
      purpose: 'Create API gateway',
      call: `
      var apigateway = new AWS.APIGateway();
      var params = {
        customerId: 'STRING_VALUE',
        description: 'STRING_VALUE',
        enabled: true || false,
        generateDistinctId: true || false,
        name: 'STRING_VALUE',
        stageKeys: [
          {
            restApiId: 'STRING_VALUE',
            stageName: 'STRING_VALUE'
          },
          /* more items */
        ],
        value: 'STRING_VALUE'
      };
      apigateway.createApiKey(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });`,
      arguments: '',
      notes: `
      http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/APIGateway.html
      `,
    })
    .concat({
      purpose: 'Create VPC (Virtual Private Cloud)',
      call: `
      import AWS from 'aws-sdk';
      const ec2 = new AWS.EC2();
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
      import AWS from 'aws-sdk';
      const s3 = new AWS.S3();
      const html = s3.getObject({Bucket: *bucketName*/client, Key: 'index.html'}).createReadStream();
      const clientJs = s3.getObject({Bucket: *bucketName*/client, Key: 'bundle.js'}).createReadStream();
      const regionalL = s3.getObject({Bucket: *bucketName*/regional, Key: 'bundle.js'}).createReadStream();
      const userL = s3.getObject({Bucket: *bucketName*/user, Key: 'bundle.js'}).createReadStream();
      `,
      arguments: '',
      notes: 'use the file streams provided to pipe or read out code for the lamda\'s and client',
    });
  // fs.unlinkSync('mammal.json');
  fs.writeFile('mammal.json', JSON.stringify(output, null, 2).replace(/\\n/g, '\n'), err => {
    if (err) throw err;
    console.log('The file has been saved!');
    res.sendStatus(200);
  });
};
