require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(3);

var bodyParser = _interopRequireWildcard(_bodyParser);

__webpack_require__(4);

var _generate = __webpack_require__(6);

var _generate2 = _interopRequireDefault(_generate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _express2.default();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/generate', _generate2.default);

app.listen(process.env.PORT);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dotenv = __webpack_require__(5);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = __webpack_require__(7);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (req, res) => {
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
     ${Object.keys(body).map(region => `lambda.createFunction({...params, region:${region}, function(err, data) {
          if (err) console.log(err, err.stack);
          else     console.log(data);
         })`).join('\n\n')}
    `,
    arguments: ''
  }).concat({
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
       ${Object.keys(body).map(region => `lambda.createFunction({...params, region:${region}, function(err, data) {
            if (err) console.log(err, err.stack);
            else     console.log(data);
           })`).join('\n\n')}
      `,
    arguments: ''
  }).concat({
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
    notes: 'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html'
  }).concat({
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
      `
  }).concat({
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
      `
  }).concat({
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
    notes: 'use the file streams provided to pipe or read out code for the lamda\'s and client'
  });
  // fs.unlinkSync('mammal.json');
  _fs2.default.writeFile('mammal.json', JSON.stringify(output, null, 2).replace(/\\n/g, '\n'), err => {
    if (err) throw err;
    console.log('The file has been saved!');
    res.sendStatus(200);
  });
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map