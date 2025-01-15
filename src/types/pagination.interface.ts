export interface Pagination<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  error?: string;
}
