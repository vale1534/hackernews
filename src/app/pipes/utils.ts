export function pluralize(num: number, label: string): string {
  const result = num + label;
  return num > 1 ? result + 's' : result;
}
