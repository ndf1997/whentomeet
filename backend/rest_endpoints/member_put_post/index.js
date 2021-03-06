console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
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

    if (event.httpMethod != 'POST' && event.httpMethod != 'PUT') {
        done(new Error(`Unsupported method "${event.httpMethod}"`));
        return;
    }


    var toInsert = {};
    toInsert["TableName"] = process.env.TABLE_NAME;
    toInsert["Item"] = JSON.parse(event.body);
    dynamo.putItem(toInsert, done);
    return;

            
    
};

