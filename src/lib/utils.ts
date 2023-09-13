export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function getCurrencyCode(mcId: string): string {
  return mcId.slice(0, 3).toUpperCase()
}