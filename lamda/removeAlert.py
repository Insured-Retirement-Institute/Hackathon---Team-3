import json
import urllib.request
import uuid
from datetime import datetime, timezone, timedelta
import boto3
import random

def lambda_handler(event, context):
    # TODO implement
    body = json.loads(event.get("body", "{}"))

    # Extract two strings from the request
    policy_number = body.get("policy_number", "")
    alert_type = body.get("alert_type", "")
    
    if alert_type == 'FA':
        remove_alert(policy_number, 'Advisor Alert')
    elif alert_type == 'DQ':
        remove_alert(policy_number, 'Data Quality Alert')
    

def remove_alert(policy_number, alert_type):
    s3 = boto3.client('s3')
    bucket_name = 'alerts-t3-bucket'
    file_key = 'alerts.txt'
    messages = []

    response = s3.get_object(Bucket=bucket_name, Key=file_key)
    for line in response['Body'].iter_lines():
        new_line = line.decode('utf-8')
        if new_line[0] == '[':
            new_line = new_line[1:]
        if new_line[-1] == ']':
            new_line = new_line[:-1]
        if new_line[-1] == ',':
            new_line = new_line[:-1]
        print(new_line)
        json_line = json.loads(new_line)
        if json_line['TXLife']['TXLifeRequest']['OLifE']['Holding']['Policy']['PolNumber'] == policy_number and json_line['TXLife']['TXLifeRequest']['TransSubType']['value'] == alert_type:
            continue
        else:
            messages.append(new_line)
        
    s3.put_object(Body='['+',\n'.join(messages)+']', Bucket='alerts-t3-bucket', Key='alerts.txt')

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
