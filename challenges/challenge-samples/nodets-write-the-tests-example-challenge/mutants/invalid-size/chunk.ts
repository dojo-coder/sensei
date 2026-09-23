export function chunk<T>(list: T[], size: number): T[][] {
  if (!Number.isInteger(size) || size < 1) return [];

  const chunks: T[][] = [];
  for (let index = 0; index < list.length; index += size) {
    chunks.push(list.slice(index, index + size));
  }

  return chunks;
}
