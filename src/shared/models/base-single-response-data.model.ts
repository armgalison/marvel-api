export class BaseSingleResponseData<T> {
  constructor(
    code: number,
    status: string,
    data: T
  ) {
    this.code = code;
    this.status = status;
    this.data = data;
  }

  code: number;
  status: string;
  data: T
}