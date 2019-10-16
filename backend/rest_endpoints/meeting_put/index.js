console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();



exports.handler = (event, context, callback) => {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '201',
        body: err ? JSON.stringify(err) : JSON.stringify({"meeting_id" : event.body.meeting_id}),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });
    
    console.log(JSON.stringify(event));

    if (event.httpMethod != 'PUT' && event.httpMethod != 'PATCH') {
        done({"error" :  "Unsupported method"});
        console.log("method");
        return;
    }
    
    if (event.body != null) {
        event.body = JSON.parse(event.body);
    } 
    
    if ((event.body == null) || (event.body.meeting_id == undefined)) {
        done({"error" :  "Does not have meeting_id"});

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
            done({"error" : "meeting does not exist"});

        }
    };
    dynamo.getItem(checkItem, myCallback);

    var toInsert = {};
    toInsert["TableName"] = process.env.TABLE_NAME;
    toInsert["Item"] = event.body;
    dynamo.putItem(toInsert, done);
    return;

            
    
};

