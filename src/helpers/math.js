export const average = (arr) => {
  const total = arr.reduce((sum, b) => sum + b);
  return total / arr.length;
};

export const max = (arr) => {
  return arr.reduce((a, b) => Math.max(a, b));
};
