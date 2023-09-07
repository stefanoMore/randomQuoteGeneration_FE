export interface quoteResponse<T> {
  message: string,
  code: number,
  data: T
}

export interface tokenResponse<T> {
  message: string,
  isValid: boolean,
  payload: T
}
