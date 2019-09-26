import boto3
import json
import os

print('Loading function')
dynamo = boto3.resource('dynamodb')
table = dynamo.Table(os.environ['TABLE_NAME'])


def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }


def lambda_handler(event, context):

    print("Received event: " + json.dumps(event, indent=2))
    
    
    if event['httpMethod'] != 'PUT':
        return respond("Method not supported")
    
    body = {}
    if event['body'] != None:
        body = JSON.loads(event['body'])
    
    if bool(body) || 'meeting_id' not in body:
        return respond("missing meeting_id")
    

    checkItem = {
     TableName : os.environ['TABLE_NAME']
     Key : {
         "meeting_id" : body['meeting_id']
     }
    }

    res = table.get_item(checkItem);
    
    print(res)
    
    
    #table.put_item(Item=body)
    

    return respond(None, {'member_id' : body['member_id']})
