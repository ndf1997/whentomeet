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
    
		
    operation = event['httpMethod']

	if operation == 'PUT':
		response = table.put_item(
			Item = json.loads(event['body'])
			)

	#print("Received event: " + json.dumps(event, indent=2))


    return respond(None, operations[operation](dynamo, payload))
