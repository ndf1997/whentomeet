import boto3
import json

print('Loading function')
dynamo = boto3.resource('dynamodb')
table = dynamo.Table('408_meeting')


def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def lambda_handler(event, context):
    response = ''
    operation = event['httpMethod']
    print("Received event: " + json.dumps(event, indent=2))
    if operation == 'POST':
        response = table.put_item(
        Item = json.loads(event['body']))
    if operation == 'GET':
        response = table.get_item(
        Key = event['queryStringParameters']
        )
    
    return respond(None, response)
