export const percentDifference = (a: number, b: number) => {
  return +(100 * Math.abs((a - b) / (a + b) / 2)).toFixed(2);
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
