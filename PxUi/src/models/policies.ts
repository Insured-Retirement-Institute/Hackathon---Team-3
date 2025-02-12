import { SystemMessage } from "./system-message";

export interface IPolicy {
    [key: string]: any;
    CarrierName?: string | null;
    CarrierCode?: string | null;
    PolicyNumber?: string | null;
    ProductType?: string | null;
    ProductName?: string | null;
    PolicyValue?: number | null;
    TotalPremium?: number | null;
    AnnualizedPremium?: any | null;
    ContractIssueDate?: string | null;
    MaturityDate?: string | null;
    AnniversaryDate?: string | null;
    IssueState?: string | null;
    PolicyServicingFA?: string | null;
    InitialPremium?: number | null;
    WithdrawalAmount?: number | null;
    SurrenderChargeExpiryDate?: string | null;
    IndexRateRenewalDate?: string | null;
    InterestRateEffectiveDate?: string | null;
    InterestRateGuaranteeEndDate?: string | null;
    PolicyFunds?: PolicyFund[];
    PolicyParticipants?: PolicyParticipant[];
    PolicyBenefit?: PolicyBenefit[];
    AdvisorAlerts?: SystemMessage[];
    DataAlerts?: SystemMessage[];
}

export interface PolicyFund {
    FundName?: string | null;
    Rate?: number | null;
    GrossAccumulatedValue?: number | null;
    CurrentAllocationPercent?: number | null;
    FundExpense?: number | null;
}

export interface PolicyParticipant {
    ClientName?: string | null;
    ClientType?: string | null;
    ClientState?: string | null;
    ClientAge?: number | null;
}

export interface PolicyBenefit {
    RiderCategory?: string | number | null;
    RiderType?: string | null;
    RiderSubType?: string | null;
    RiderValue?: number | null;
}
