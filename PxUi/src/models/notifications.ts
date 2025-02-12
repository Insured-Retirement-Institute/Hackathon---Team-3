import { SystemMessage } from './system-message';

export interface INotification {
    TXLife: Txlife;
}

export interface Txlife {
    MetaDataKey: string;
    Version: string;
    id: string;
    TXLifeRequest: TxlifeRequest;
}

export interface TxlifeRequest {
    PrimaryObjectID: string;
    id: string;
    TransRefGUID: string;
    TransType: TransType;
    TransSubType: TransSubType;
    TransExeDate: string;
    TransExeTime: string;
    CorrelationGUID: string;
    OLifE: OlifE;
}

export interface TransType {
    tc: string;
    value: string;
}

export interface TransSubType {
    tc: string;
    value: string;
}

export interface OlifE {
    Holding: Holding;
}

export interface Holding {
    id: string;
    HoldingTypeCode: HoldingTypeCode;
    HoldingStatus: HoldingStatus;
    Policy: Policy;
    SystemMessage: SystemMessage[];
}

export interface HoldingTypeCode {
    tc: string;
    value: string;
}

export interface HoldingStatus {
    tc: string;
    value: string;
}

export interface Policy {
    PolNumber: string;
    LineOfBusiness: LineOfBusiness;
    ProductType: ProductType;
    CarrierName: string;
    PlanName: string;
}

export interface LineOfBusiness {
    tc: string;
    value: string;
}

export interface ProductType {
    tc: string;
    value: string;
}

export enum AdvisorAlert {
    'Income Benefit' = 1,
    'Index Rate' = 2,
    'Interest Rate' = 3,
    'Anniversary Date' = 4,
    'Maturity Date' = 5,
    'RMD is required' = 6,
    'Missing Beneficiary' = 7
}

export enum AdvisorAlertDescription {
    'Income Benefit Activation Rider Identified' = 1,
    'Index Rate Renewal Date is within the next 30 days' = 2,
    'Interest Rate Guarantee Period within 30 days' = 3,
    'Anniversary Date within next 30 days' = 4,
    'Maturity Date within the next 30 days' = 5,
    'RMD is required on this policy for 2025 in the amount of $XXXX.XX' = 6,
    'This policy is missing a Beneficiary designation' = 7
}
export enum AdvisorAlertShort {
    'Income' = 1,
    'Index' = 2,
    'Interest' = 3,
    'Anniversary' = 4,
    'Maturity' = 5,
    'RMD' = 6,
    'Beneficiary' = 7
}

export enum DataAlert {
    'Interest Rate' = 1,
    'Anniversary Date' = 2,
    'Premium' = 3,
    'Orphan Policy' = 4,
    'Beneficiary Designation' = 5
}
export enum DataAlertDescription {
    'Interest Rate Effective Date showing Before Policy Issue Date' = 1,
    'Policy Not Showing Anniversary Date' = 2,
    'Premium Showing Higher than DB' = 3,
    'Orphan Policy' = 4,
    'This policy is missing a Beneficiary designation.' = 5
}

export interface IAlertBreakdown {
    id: number;
    alert: string;
    alertDescription: string;
    alertCount: number;
}

export interface IAlertTotal {
    advisorCount: number;
    dataCount: number;
}

export enum OrganizationType {
    FinancialInstitution,
    Carrier,
    Both
}
