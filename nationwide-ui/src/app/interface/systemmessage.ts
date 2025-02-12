export interface SystemMessage {
    id: number;
    messageCode: string;
    sequence: number;
    relatedObjectType: number;
    messageDescription: string;
    messageSeverityCode: number;
    messageStartDate: string;
    messageType: number;
    messageSubject: string;
    messageSourceUserID: string;
    messageStartTime: string;
  }