from alertsv2.alert_classes.alerts import DQAlert
from alertsv2.policy import Policy

class InterestRateEffectiveDateBeforeIssueDate(DQAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 1

    def alert_description(self):
        return "Interest Rate Effective Date showing Before Policy Issue Date"

    def condition(self):
        if (self.policy.InterestRateEffectiveDate is not None) & (self.policy.ContractIssueDate is not None):
            return self.policy.InterestRateEffectiveDate < self.policy.ContractIssueDate
        return False

    def add_extra_fields(self):
        pass

    def alert_value(self):
        return None


class NullAnniversaryDate(DQAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 2

    def alert_description(self):
        return "Policy Not Showing Anniversary Date"

    def condition(self):
        return self.policy.AnniversaryDate is None

    def add_extra_fields(self):
        pass

    def alert_value(self):
        return None


class PremiumGreaterThanDeathBenefit(DQAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)
        
    def alert_id(self):
        return 3

    def alert_description(self):
        return "Total Premium Showing Higher than DB"

    def condition(self):
        death_benefit = self.get_death_benefit() or self.policy.TotalPremium
        return self.policy.TotalPremium > death_benefit


    def get_death_benefit(self):
        if self.policy.PolicyBenefits is not None:
            for rider in self.policy.PolicyBenefits:
                if rider.RiderType == "DEATH BENEFIT":
                    return rider.RiderValue
        return None
        
    def add_extra_fields(self):
        pass


    def alert_value(self):
        return None


class OrphanedPolicy(DQAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)
        
    def alert_id(self):
        return 4

    def alert_description(self):
        return "Orphan Policy"

    def condition(self):
        return self.policy.PolicyServicingFA is None
        
    def add_extra_fields(self):
        pass

    def alert_value(self):
        return None


class MissingBeneficiaryDQ(DQAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 5

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