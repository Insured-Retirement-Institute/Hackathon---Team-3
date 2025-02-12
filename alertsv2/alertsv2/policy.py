import json
from datetime import datetime

def convert_date(date_string):
    try:
        return datetime.strptime(date_string, '%Y-%m-%d').date()
    except:
        return None

class Policy:
    def __init__(self, json):
        self.json = json
        self.Id = json.get('PolicyNumber')
        self.CarrierName = json.get('CarrierName')
        self.CarrierCode = json.get('CarrierCode')
        self.PolicyNumber = json.get('PolicyNumber')
        self.ProductType = json.get('ProductType')
        self.ProductName = json.get('ProductName')
        self.PolicyValue = json.get('PolicyValue')
        self.TotalPremium = json.get('TotalPremium')
        self.AnnualizedPremium = json.get('AnnualizedPremium')
        self.ContractIssueDate = convert_date(json.get('ContractIssueDate'))
        self.MaturityDate = convert_date(json.get('MaturityDate'))
        self.AnniversaryDate = convert_date(json.get('AnniversaryDate'))
        self.IssueState = json.get('IssueState')
        self.PolicyServicingFA = json.get('PolicyServicingFA')
        self.InitialPremium = json.get('InitialPremium')
        self.WithdrawalAmount = json.get('WithdrawalAmount')
        self.SurrenderChargeExpiryDate = convert_date(json.get('SurrenderChargeExpiryDate'))
        self.IndexRateRenewalDate = convert_date(json.get('IndexRateRenewalDate'))
        self.InterestRateEffectiveDate = convert_date(json.get('InterestRateEffectiveDate'))
        self.InterestRateGuaranteeEndDate = convert_date(json.get('InterestRateGuaranteeEndDate'))
        self.Age = json.get("Age")
        self.QualifiedPolicy = json.get("QualifiedPolicy")
        self.PolicyFunds = [PolicyFund(self.Id, j) for j in json.get('PolicyFunds')] if json.get('PolicyFunds') else None
        self.PolicyParticipants = [PolicyParticipant(self.Id, j) for j in json.get('PolicyParticipants')] if json.get('PolicyParticipants') else None
        self.PolicyBenefits = [PolicyBenefit(self.Id, j) for j in json.get('PolicyBenefit')] if json.get('PolicyBenefit') else None

    def add_field(self, field_name, value):
        setattr(self, field_name, value)


class PolicyFund:
    def __init__(self, id, json):
        self.Id = id
        self.FundName = json.get('FundName')
        self.Rate = json.get('Rate')
        self.GrossAccumulatedValue = json.get('GrossAccumulatedValue')
        self.CurrentAllocationPercent = json.get('CurrentAllocationPercent')
        self.FundExpense = json.get('FundExpense')

class PolicyParticipant:
    def __init__(self, id, json):
        self.Id = id
        self.ClientName = json.get('ClientName')
        self.ClientType = json.get('ClientType')
        self.ClientState = json.get('ClientState')
        self.ClientAge = json.get('ClientAge')

class PolicyBenefit:
    def __init__(self, id, json):
        self.Id = id
        self.RiderCategory = json.get('RiderCategory')
        self.RiderType = json.get('RiderType')
        self.RiderSubType = json.get('RiderSubType')
        self.RiderValue = self.convert_to_float(json.get('RiderValue'))

    def convert_to_float(self, value):
        try:
            return float(value)
        except:
            None