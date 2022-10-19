function sortNumericUndefined(a: number | undefined, b: number | undefined): number {
  if(a === undefined && b === undefined) return 0
  if(a === undefined && b !== undefined) return 1
  if(a !== undefined && b === undefined) return -1
  return a! - b!
}

export {sortNumericUndefined}
