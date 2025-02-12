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
    file_key = 'fa_alerts.txt'

    response = s3.get_object(Bucket=bucket_name, Key=file_key)
    for line in response['Body'].iter_lines():
        send_fa_alert(line.decode())

def send_fa_alert(message):
    api_url = 'https://ho5yxpq078.execute-api.us-west-2.amazonaws.com/Prod/vendor/alerts'
    payload = message.encode('UTF-8')
    req = urllib.request.Request(api_url, data=payload, method="POST", headers = {'content-type': 'application/json'})
    with urllib.request.urlopen(req) as response:
        response_body = response.read().decode("utf-8")
