export interface ProgressMaxData {
  stateCode?: string;      // Default: 'ALL'
  districtCode?: string;   // Default: 'ALL'
  componentId?: number;    // Default: -1
  month?: number;          // Default: -1
  year?: number;           // Default: -1
  aisheCode?: string;      // Default: 'ALL'
  isForwardedToNpd?: boolean;
  maxMonthData?: number;
  financialYear?:number;
  financialQuarter?:number;
  isTargetAchievement?:string; 
  moocId?:string;    // Default: 'ALL'
}