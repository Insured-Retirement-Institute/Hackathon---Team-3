import json
import boto3

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucket_name = 'alerts-t3-bucket'
    file_key = 'policies.txt'
    messages = []

    response = s3.get_object(Bucket=bucket_name, Key=file_key)
    for line in response['Body'].iter_lines():
        messages.append(line.decode())

    return {
        'statusCode': 200,
        'headers': {'content-type': 'application/json'},
        'body': ' '.join(messages)
    }
