export const getFirstOrThrow = <T>(arr: T[], err: Error): T | never => {
  if (arr.length === 0) {
    throw err
  }

  return arr[0]
}
