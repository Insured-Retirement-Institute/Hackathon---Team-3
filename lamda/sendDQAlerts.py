import json
import urllib.request
import uuid
from datetime import datetime, timezone, timedelta
import boto3
import random
import string
import time

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucket_name = 'alerts-t3-bucket'
    file_key = 'dq_alerts.txt'
    sleep = event['sleep'] == 'true'

    response = s3.get_object(Bucket=bucket_name, Key=file_key)
    for line in response['Body'].iter_lines():
        json_line = json.loads(line.decode())
        if sleep:
            json_line['TXLife']['TXLifeRequest']['OLifE']['Holding']['Policy']['PolNumber'] = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))
        new_line = json.dumps(json_line)
        send_dq_alert(new_line)
        if sleep:
            time.sleep(15)


def send_dq_alert(message):
    api_url = 'http://35.86.75.71:8080/app/api/json/txlife'
    payload = message.encode('UTF-8')#json.loads(message)
    req = urllib.request.Request(api_url, data=payload, method="POST", headers={'content-type': 'application/json'})
    with urllib.request.urlopen(req) as response:
        response_body = response.read().decode("utf-8")
