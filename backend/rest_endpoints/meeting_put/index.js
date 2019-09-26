console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();



exports.handler = (event, context, callback) => {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '201',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });

    if (event.httpMethod != 'PUT') {
        done(new Error(`Unsupported method "${event.httpMethod}"`));
        return;
    }
    
    if (event.body != null) {
        event.body = JSON.parse(event.body);
    } 
    
    if ((event.body == null) || (event.body.meeting_id == undefined)) {
        done(new Error("Does not have meeting_id"));
        return;
    }
    
    var checkItem = {
     TableName : process.env.TABLE_NAME,
     Key : {
         "meeting_id" : event.body.meeting_id
     }
    };
 
    var myCallback = function(abc, res) {
        if (Object.keys(res).length === 0) {
            done(new Error("Meeting does not exist"));
        }
    };
    dynamo.getItem(checkItem, myCallback);

    var toInsert = {};
    toInsert["TableName"] = process.env.TABLE_NAME;
    toInsert["Item"] = event.body;
    dynamo.putItem(toInsert, done);
    return;

            
    
};

