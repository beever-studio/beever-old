export function mapToSelectOptions<T>(
  items: T[],
  label: keyof T,
  value: keyof T
): { label: T[keyof T]; value: T[keyof T] }[] {
  return items.map((item) => ({
    label: item[label],
    value: item[value],
  }));
}
