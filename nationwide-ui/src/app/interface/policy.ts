import { SystemMessage } from "./systemmessage";

export interface Policy {
    id: number;
    polNumber: string;
    alertReceivedDate: string
    lineOfBusiness: string;
    carrierName: string;
    productType: string;
    productCode: string;
    carrierCode: string;
    planName: string;
    jurisdiction: string;
    cusipNum: string;
    systemMessages: SystemMessage[];
  }