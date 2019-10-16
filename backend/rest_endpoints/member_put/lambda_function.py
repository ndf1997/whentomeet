import boto3
import json
import os

print('Loading function')
dynamo = boto3.resource('dynamodb')
table = dynamo.Table(os.environ['TABLE_NAME'])


def respond(err, res=None):
    print(err)
    print(res)
    return {
        'statusCode': '400' if err else '200',
        'body': json.dumps(err) if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }


def lambda_handler(event, context):

    print("Received event: " + json.dumps(event))
    
    
    if event['httpMethod'] != 'PUT' and event['httpMethod'] != 'PATCH':
        return respond({"error" : "method not supported"})
    
    body = {}
    if event['body'] != None:
        body = json.loads(event['body'])
    
    if body == None or 'meeting_id' not in body:
        return respond({"error" : "missing meeting_id"})
    if 'member_id' not in body:
        return respond({"error" : "missing member_id"})
    
    data={}
    res = table.get_item(
        TableName = os.environ['TABLE_NAME'],
        Key={
            'meeting_id' : body['meeting_id']
            },
        AttributesToGet=[
            'members',
            ],
        )     
    data = res['Item']


    i = 0
    j = 0
    for member in data['members']:
        if member['member_id'] == body['member_id']:
            data['members'][i] = body
            j = 1
        i += 1
        
    if j == 0:
        return respond({"error" : "member not in meeting"})
  
    
    res = table.update_item(
        TableName = os.environ['TABLE_NAME'],
        Key = {
            'meeting_id' : body['meeting_id']
        },
        UpdateExpression="SET members = :vals",
        ExpressionAttributeValues={
            ':vals' : data['members'],
        },
        ReturnValues="UPDATED_NEW"
    )

    return respond(None, {"member_id" : body['member_id']})
