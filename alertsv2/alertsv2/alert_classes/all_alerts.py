from alertsv2.policy import Policy
from alertsv2.alert_classes.fa_alerts import *
from alertsv2.alert_classes.dq_alerts import *
from alertsv2.alert_classes.no_alerts import *


class Alerts:
    def __init__(self, policy):
        self.policy = policy
        self.no_alert_list = [BaseNoAlert(policy)]
        self.dq_alert_list = [
            InterestRateEffectiveDateBeforeIssueDate(policy),
            NullAnniversaryDate(policy),
            PremiumGreaterThanDeathBenefit(policy),
            OrphanedPolicy(policy),
            MissingBeneficiaryDQ(policy)
        ]
        self.fa_alert_list = [
            IncomeBenefitRiderAlert(policy),
            IndexRateRenewalDateAlert(policy),
            InterestRateGuaranteePeriodAlert(policy),
            AnniversaryDateAlert(policy),
            MaturityDateAlert(policy),
            RMDAlert(policy),
            MissingBeneficiaryFA(policy)
        ]

    def loop_through_no_alerts(self):
        no_results = {}
        no_results['policy'] = self.policy.json
        no_results['alert_type'] = 'NoAlert'
        ids = []
        values = []
        
        for alert in self.no_alert_list:
            if alert.condition():
                ids.append(alert.alert_id)
                values.append(alert.alert_value)
            no_results['alerts'] = ids
            no_results['values'] = values

        if len(ids) > 0:
            return no_results
        return None

    def loop_through_dq_alerts(self):
        dq_results = {}
        dq_results['policy'] = self.policy.json
        dq_results['alert_type'] = 'DQ'
        ids = []
        values = []
        
        for alert in self.dq_alert_list:
            if alert.condition():
                ids.append(alert.alert_id)
                values.append(alert.alert_value)
            dq_results['alerts'] = ids
            dq_results['values'] = values

        if len(ids) > 0:
            return dq_results
        return None


    def loop_through_fa_alerts(self):
        fa_results = {}
        fa_results['policy'] = self.policy.json
        fa_results['alert_type'] = 'FA'
        ids = []
        values = []
        
        for alert in self.fa_alert_list:
            if alert.condition():
                ids.append(alert.alert_id)
                values.append(alert.alert_value)
            fa_results['alerts'] = ids
            fa_results['values'] = values

        if len(ids) > 0:
            return fa_results
        return None

                