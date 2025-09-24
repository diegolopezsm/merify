export const safeRequest = async <T>(
  fn: () => Promise<T>,
): Promise<[T | undefined, Error | undefined]> => {
  try {
    const data = await fn();
    return [data, undefined] as [T, undefined];
  } catch (error) {
    return [undefined, error] as [undefined, Error];
  }
};
