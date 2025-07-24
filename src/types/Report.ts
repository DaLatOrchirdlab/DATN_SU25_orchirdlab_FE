export interface Report {
  id: string;
  name: string;
  description: string;
  sample: string;
  technician: string;
  status: boolean;
}
export interface ReportApiResponse {
  value: {
    totalCount: number;
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    data: Report[];
  };
}
