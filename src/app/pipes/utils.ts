export function pluralize(num: number, label: string): string {
  let result = num + label;
  if (num !== 1) result += 's';
  return result;
}