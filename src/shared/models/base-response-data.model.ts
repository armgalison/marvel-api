export class BaseResponseData <T> {
  constructor (baseResponseData: {
    code: number
    offset: number,
    limit: number,
    total: number,
    count: number,
    results: Array<T>
  }) {
    this.code = Number(baseResponseData.code);
    this.data = {
      offset: Number(baseResponseData.offset),
      count: Number(baseResponseData.count),
      limit: Number(baseResponseData.limit),
      total: Number(baseResponseData.total),
      results: baseResponseData.results
    };
  }

  code: number;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<T>;
  }
}