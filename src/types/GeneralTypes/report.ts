export interface Report {
    success: boolean;
    totalOrders: number;
    totalOutstanding: number;
    totalExpenses: number;
    totalRevenue: number;
}

export interface MonthlyOrderReport {
    month: string; 
    value: number; 
  }
  
  export interface MonthlyReportResponse {
    success: boolean; 
    order_report: MonthlyOrderReport[]; 
    expense_report :MonthlyOrderReport[];
    revenue_report: MonthlyOrderReport[]
    outstanding_report: MonthlyOrderReport[]
    percentage_change?: number[];

  }