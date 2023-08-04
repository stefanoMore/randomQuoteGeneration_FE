export interface quoteResponse<T> {
  message: string,
  code: number,
  data: T
}
