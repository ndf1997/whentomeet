import boto3
import json
import os
import uuid

print('Loading function')
dynamo = boto3.resource('dynamodb')
table = dynamo.Table(os.environ['TABLE_NAME'])
memberTable = dynamo.Table(os.environ['TABLE_MEMBER'])

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '201',
        'body': err if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }


def lambda_handler(event, context):
    

    #print("Received event: " + json.dumps(event, indent=2))
    body = json.loads(event['body'])
    
    if 'meeting_id' not in body.keys():
        return respond("Missing meeting_id")
    
    id = str(uuid.uuid4())[:8]

    
    body['member_id'] = id;
    res = table.update_item(
        Key = {
            'meeting_id' : body['meeting_id']
        },
        UpdateExpression="SET members = list_append(members, :vals)",
        ExpressionAttributeValues={
            ':vals' : [body],
        },
        ReturnValues="UPDATED_NEW"
    )
    #body['member_id'] = id;
    
    #memberTable.put_item(
     #   Item=body
    
    
    #)
    

    return respond(None,{'member_id' : id})
