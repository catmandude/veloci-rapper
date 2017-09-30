import fs from 'fs';

export default (req, res, next) => {
  const body = JSON.parse(Object.keys(request.body)[0]);
  let output = [].concat({
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
      call: '',
      arguments: '',
    })
    .concat({
      purpose: 'Get code from git source',
      call: '',
      arguments: '',
    });

  fs.writeFile('mammal.json', JSON.stringify(output, null, 2), (err) => {
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
