import json
from alertsv2.policy import Policy
from alertsv2.alert_classes.all_alerts import Alerts

file = json.loads(open("data/full_policy_data_2025_02_11.txt", "r").read())
policies = [Policy(p) for p in file]


all_no_alerts = [str(Alerts(p).loop_through_no_alerts()) for p in policies]
all_no_alerts = "\n".join([a for a in all_no_alerts if a != "None"])
all_dq_alerts = [str(Alerts(p).loop_through_dq_alerts()) for p in policies]
all_dq_alerts = "\n".join([a for a in all_dq_alerts if a != "None"])
all_fa_alerts = [str(Alerts(p).loop_through_fa_alerts()) for p in policies]
all_fa_alerts = "\n".join([a for a in all_fa_alerts if a != "None"])

all_alerts = all_dq_alerts + "\n" + all_fa_alerts + "\n" + all_no_alerts
all_alerts = all_alerts.replace(": 'None'", ": null").replace(": None", ": null").replace("\'", '\"').replace(": nan", ": null").replace("nan", "null").replace("None", "null")

file_write = open("data/new_alert_output_2025_02_12.txt", "w")
file_write.write(all_alerts)
file_write.close()

