from alertsv2.alert_classes.alerts import FAAlert
from alertsv2.policy import Policy

class IncomeBenefitRiderAlert(FAAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 1

    def alert_description(self):
        return "Income Benefit Activation Rider Identified"

    def condition(self):
        if self.policy.PolicyBenefits is not None:
            for rider in self.policy.PolicyBenefits:
                for indicator in ['linc rider', 'lifetime income']:
                    if indicator in rider.RiderSubType.lower():
                        return True
        return False

    def add_extra_fields(self):
        pass

    def alert_value(self):
        return None
        

class IndexRateRenewalDateAlert(FAAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 2
        
    def alert_description(self):
        return "Index Rate Renewal Date is within the next 30 days"

    def condition(self):
        if self.policy.IndexRateRenewalDate:
            return 0 <= (self.policy.IndexRateRenewalDate - self.policy.Today).days <= 30
        return False

    def add_extra_fields(self):
        pass

    def alert_value(self):
        return None


class InterestRateGuaranteePeriodAlert(FAAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 3

    def alert_description(self):
        return "Interest Rate Guarantee Period within 30 days"

    def condition(self):
        if self.policy.InterestRateGuaranteeEndDate:
            return 0 <= (self.policy.InterestRateGuaranteeEndDate - self.policy.Today).days <= 30
        return False

    def add_extra_fields(self):
        pass
    
    def alert_value(self):
        return None
        

class AnniversaryDateAlert(FAAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 4

    def alert_description(self):
        return "Anniversary Date within next 30 days"

    def condition(self):
        if self.policy.AnniversaryDate:
            return 0 <= (self.policy.AnniversaryDate - self.policy.Today).days <= 30
        return False

    def add_extra_fields(self):
        pass 

    def alert_value(self):
        return None


class MaturityDateAlert(FAAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 5

    def alert_description(self):
        return "Maturity Date within the next 30 days"

    def condition(self):
        if self.policy.MaturityDate:
            return 0 <= (self.policy.MaturityDate - self.policy.Today).days <= 30
        return False

    def add_extra_fields(self):
        pass

    def alert_value(self):
        return None


class RMDAlert(FAAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 6

    def alert_description(self):
        return "RMD is required"

    def condition(self):
        return (self.policy.Age >= 73) & (self.policy.QualifiedPolicy == 1)

    def add_extra_fields(self):
        pass

    def alert_value(self):
        return round(self.policy.PolicyValue*.1, 2)


class MissingBeneficiaryFA(FAAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 7

    def alert_description(self):
        return "This policy is missing a Beneficiary designation."

    def condition(self):
        for party in self.policy.PolicyParticipants:
            if party.ClientType == "BENEFICIARY":
                return False
        return True

    def add_extra_fields(self):
        pass

    def alert_value(self):
        return None
