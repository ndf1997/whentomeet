import boto3
import json
import os

print('Loading function')
dynamo = boto3.resource('dynamodb')
tableMeeting = dynamo.Table(os.environ['TABLE_MEETING'])
tableMember = dynamo.Table(os.environ['TABLE_MEMBER'])


def respond(err, res=None):
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

    if event['httpMethod'] != 'GET':
        return respond({"error" : "Not a GET method"});
    data = {}
    if event['queryStringParameters'] == None or 'meeting_id' not in event['queryStringParameters']:
        return respond({"error" : "Missing meeting_id"})
        
        

        
    res = tableMeeting.get_item(
        TableName = os.environ['TABLE_MEETING'],
        Key={
            'meeting_id' : event['queryStringParameters']['meeting_id']
            },
        AttributesToGet=[
            'members',
            ],
        )     
    data = res['Item']
    print(data)
    
    if 'member_id' in event['queryStringParameters']:
        print("should not be here")
        data = {"error" : "Member not in meeting"}
        for member in res['Item']['members']:
            if event['queryStringParameters']['member_id'] == member['member_id']:
                data = member
                break;
        
    print(data)
    return respond(None, data)