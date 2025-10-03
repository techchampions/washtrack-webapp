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
export interface OrderReportItem {
  month: string;
  value: number;
}

export interface MonthlyReportResponse {
  success: boolean;
  order_report: OrderReportItem[];
  percentage_change: number[];
}
