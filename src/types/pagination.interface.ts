export interface Pagination<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalResults: number;
  error?: string;
}
