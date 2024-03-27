import Decimal from 'decimal.js';

interface RatioParam {
  // 温度
  temp: number;
  // 时间
  time: Date;
}

export const isWin = () => process.platform === 'win32';

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function transpose(matrix: number[][]) {
  if (matrix.length === 0) return [];
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function calcRatio(start: RatioParam, end: RatioParam, q: number) {
  // 波长转温度计算，差值/100
  const tempDiff = new Decimal(end.temp).sub(start.temp).div(100);
  const logDiff = Decimal.log(parseToHour(end.time)).sub(Decimal.log(parseToHour(start.time)));
  if (tempDiff.equals(0) || logDiff.equals(0)) {
    return 0;
  }
  const x = tempDiff.div(logDiff);

  return new Decimal(q).div(new Decimal(4).mul(Math.PI).mul(x)).toNumber();
}

function parseToHour(date: Date): number {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return hour + minute / 60 + second / 3600;
}

// 计算温差
export function calcDiff(after: number[], before: number[]) {
  const diff: number[] = [];
  for (let i = 0; i < after.length; i++) {
    diff.push(new Decimal(after[i]).sub(before[i]).div(100).toNumber());
  }
  return diff;
}

export async function runPromise(promises: Promise<any>[], delay: number): Promise<any[]> {
  const results: any[] = [];

  for (const promise of promises) {
    const result = await promise;
    results.push(result);
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  return results;
}
