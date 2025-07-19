export const getEnumValues = (e: Record<any, string>): [string, ...string[]] => {
  return Object.values(e) as [string, ...string[]]
}
