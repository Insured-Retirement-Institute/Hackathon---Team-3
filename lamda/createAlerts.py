import json
import urllib.request
import uuid
from datetime import datetime, timezone, timedelta
import boto3
import random

#DQ = MS, FA = Nationwide

lookups = {'FA': {
        1:('Income Benefit Activation Rider Identified', 1),
        2:('Index Rate Renewal Date is within the next 30 days', 2),
        3:('Interest Rate Guarantee Period within 30 days', 3),
        4:('Anniversary Date within next 30 days', 2),
        5:('Maturity Date within the next 30 days', 1),
        6:('RMD is required on this policy for 2025 in the amount of $', 2),
        7:('This policy is missing a Beneficiary designation', 3),
    },
    'DQ': {
            1:('Interest Rate Effective Date showing Before Policy Issue Date', 1),
            2:('Policy Not Showing Anniversary Date', 2),
            3:('Premium Showing Higher than DB', 3),
            4:('Orphan Policy', 2),
            5:('This policy is missing a Beneficiary designation', 1)
        }}

def get_alert_description(alert_type, alert, value):
    description = lookups[alert_type][alert][0]
    if value != None:
        description = description + str(value)
    return description

def get_alert_severity(alert_type, alert):
    return lookups[alert_type][alert][1]

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    file_key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    messages = []
    fa_alerts = []
    dq_alerts = []
    policies = {}
    policies_missing_bene = {}

    response = s3.get_object(Bucket=bucket_name, Key=file_key)
    for line in response['Body'].iter_lines():
        (policy_number, carrier_name, plan_name, product_type, alerts, alert_values, alert_type) = strip_json(line)
        message = create_message(alert_type, policy_number, carrier_name, plan_name, product_type, alerts, alert_values)
        messages.append(message)

        json_object = json.loads(line)
        if policy_number not in policies:
            policies[policy_number] = json.dumps(json_object['policy'])

        if policy_number not in policies_missing_bene and ((alert_type == 'DQ' and 5 in alerts) or (alert_type == 'FA' and 7 in alerts)):
            policies_missing_bene[policy_number] = json.dumps(json_object['policy'])

        if alert_type == 'DQ':
            dq_alerts.append(message)
        elif alert_type == 'FA':
            fa_alerts.append(message)

    s3.put_object(Body='['+',\n'.join(messages)+']', Bucket='alerts-t3-bucket', Key='alerts.txt')
    s3.put_object(Body='\n'.join(fa_alerts), Bucket='alerts-t3-bucket', Key='fa_alerts.txt')
    s3.put_object(Body='\n'.join(dq_alerts), Bucket='alerts-t3-bucket', Key='dq_alerts.txt')
    s3.put_object(Body='['+',\n'.join(policies.values())+']', Bucket='alerts-t3-bucket', Key='policies.txt')
    s3.put_object(Body='\n'.join(policies_missing_bene.values()), Bucket='alerts-t3-bucket', Key='policies_missing_bene.txt')

def create_alert_messages(alerts, alert_values, alert_type, message_time):
    messages = []
    if alert_type != 'NoAlert':
        for index, (alert, value) in enumerate(zip(alerts, alert_values)):
            message_description = get_alert_description(alert_type, alert, value)
            severity = get_alert_severity(alert_type, alert)
            message = f'{{' +\
                        f'"MessageCode": "{alert}",' +\
                        f'"MessageDescription": "{message_description}",' +\
                        f'"MessageStartTime": "{message_time}",' +\
                        f'"MessageSeverityCode": "{severity}"' +\
                        f'}}'
            messages.append(message)
    return ','.join(messages)

#alert_type = "MS" or "Nationwide"
#alerts = [1,2,3,4] array of numbers to cross reference
def create_message(alert_type, policy_number, carrier_name, plan_name, product_type, alerts, alert_values):
    sub_type = 'Data Quality Alert' if alert_type == 'DQ' else 'Advisor Alert'
    company = 'MS' if alert_type == 'DQ' else 'Nationwide'
    now_utc = datetime.now(timezone.utc) - timedelta(days= random.randint(0, 180))
    alert_messages = create_alert_messages(alerts, alert_values, alert_type, now_utc.time())
    alert_message = f'{{' + \
    f'"TXLife": {{' + \
    f'"MetaDataKey": "{company}",' + \
    f'"Version": "1.0",' + \
    f'"id": "{str(uuid.uuid4())}",' + \
    f'"TXLifeRequest": {{' + \
    f'"PrimaryObjectID": "{str(uuid.uuid4())}",' + \
    f'"id": "{str(uuid.uuid4())}",' + \
    f'"TransRefGUID": "{str(uuid.uuid4())}",' + \
    f'"TransType": {{' + \
    f'"tc": "1214",' + \
    f'"value": "Proformex Alert Message"' + \
    f'}},' + \
    f'"TransSubType": {{' + \
    f'"tc": "18800",' + \
    f'"value": "{sub_type}"' + \
    f'}},' + \
    f'"TransExeDate": "{now_utc.date()}",' + \
    f'"TransExeTime": "{now_utc.time()}",'  + \
    f'"CorrelationGUID": "{str(uuid.uuid4())}",' + \
    f'"OLifE": {{' + \
    f'"Holding": {{' + \
    f'"id": "{str(uuid.uuid4())}",' + \
    f'"HoldingTypeCode": {{' + \
    f'"tc": "2",' + \
    f'"value": "Policy"' + \
    f'}},' + \
    f'"HoldingStatus": {{' + \
    f'"tc": "1",' + \
    f'"value": "Active the Holding is in force"' + \
    f'}},' + \
    f'"Policy": {{' + \
    f'"PolNumber": "{policy_number}",' + \
    f'"LineOfBusiness": {{' + \
    f'"tc": "2",' + \
    f'"value": "Annuity"' + \
    f'}},' + \
    f'"ProductType": {{' + \
    f'"tc": "10",' + \
    f'"value": "{product_type}"'+ \
    f'}},' + \
    f'"CarrierName": "{carrier_name}",' + \
    f'"PlanName": "{plan_name}"' + \
    f'}},' + \
    f'"SystemMessage": ['+ \
    f'{alert_messages}'+ \
    f']'+ \
    f'}}'+ \
    f'}}'+ \
    f'}}'+ \
    f'}}'+ \
    f'}}'
    return alert_message

def strip_json(line):
    json_object = json.loads(line)
    policy_number = json_object['policy']['PolicyNumber']
    carrier_name = json_object['policy']['CarrierName']
    plan_name = json_object['policy']['ProductName']
    product_type = json_object['policy']['ProductType']
    alerts = json_object['alerts']
    alert_values = json_object['values']
    alert_type = json_object['alert_type']
    return (policy_number, carrier_name, plan_name, product_type, alerts, alert_values, alert_type)
