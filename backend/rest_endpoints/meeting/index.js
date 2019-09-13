console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

 /**
  * CS 408 - whentomeet
  * Microservice for meeting table
  * GET - get meeting
  * POST - create new meeting
  * 
  * **/
  
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

  console.log(event.body);
    console.log(event.queryStringParameters);
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {

        case 'GET': //Get a specific meeting entry
            var toGet = {};
            toGet["TableName"] = "408_meeting";
            toGet["Key"] = event.queryStringParameters; // Should be in the form of ?meeting_id=abc123
            dynamo.getItem(toGet, done);
            break;
        case 'POST': //Add new meeting
            var toInsert = {};
            toInsert["TableName"] = "408_meeting";
            toInsert["Item"] = JSON.parse(event.body);
            dynamo.putItem(toInsert, done);
            break;
   
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
