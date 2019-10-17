console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));


    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify({"deleted" : event.queryStringParameters.meeting_id}),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });

    if (event.httpMethod != 'DELETE') {
        done(new Error(`Unsupported method "${event.httpMethod}"`));
        return;
    }

    var toGet = {};
    toGet["TableName"] =  process.env.TABLE_NAME;
    toGet["Key"] = event.queryStringParameters; // Should be in the form of ?primary_id=abc123
    dynamo.deleteItem(toGet, done);
    return;

            
    
};