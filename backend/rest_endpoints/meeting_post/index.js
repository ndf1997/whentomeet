const shortid = require('shortid');
const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


exports.handler = (event,context,callback) => {
    var id = shortid.generate();
    // TODO implement
    var response = {
        'url' : "http://whentomeet.s3-website.us-east-2.amazonaws.com/" + id,
        'meeting_id' : id
        
    }
  const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '201',
        body: err ? err.message : JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });
    
    
    
    if (event.httpMethod != 'POST') {
        done(new Error(`Unsupported method "${event.httpMethod}"`));
        return;
    }
    
    if (event.body != null) {
        event.body = JSON.parse(event.body);
    } 
    if (event.body == null) {
        event.body = {};
    }
    
    if (event.body.members == undefined) {
        event.body['members'] = {}
    }
    
    event.body['meeting_id'] = id;
    var toInsert = {
        'TableName' : '408_meeting',
        'Item' : event.body
    }
    console.log(toInsert);
    dynamo.putItem(toInsert, done);
   
    
    
    return;
};
