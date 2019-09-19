console.log('Loading function');

var hash = require('object-hash');
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
    console.log('Received event:', JSON.stringify(event, null, 2));

    event.body = JSON.parse(event.body);
    console.log("ID" + event.body.meeting_id);

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (event.httpMethod != 'POST') {
        done(new Error(`Unsupported method "${event.httpMethod}"`));
        return;
    }
    
    var id = hash(event.body.member_name)

    var toInsert = {
        TableName : process.env.TABLE_NAME,
        Key : {
            "meeting_id" : event.body.meeting_id
        },
        UpdateExpression: "SET #m = list_append(#m, :vals)",
        ExpressionAttributeNames : {
            "#m" : "members"
        },
        ExpressionAttributeValues : {
            ":vals" : [{"member_name" : event.body.member_name, "member_id" : id}]
        }
    };

    dynamo.updateItem(toInsert, done(null, {"member_id" : id}));
    return;

            
    
};

