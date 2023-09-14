export const safeJSONParse = (data: string): any => {
  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
};

export const safeJSONStringify = (data: any): string => {
  try {
    return JSON.stringify(data) || '';
  } catch {
    return '';
  }
};

export const withTimeout = <T>(fn: Promise<T>, timeout: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    const nodeTimeout = setTimeout(() => {
      reject(`Timeout ${timeout} exceed`);
    }, timeout);

    fn.then(
      (data) => {
        clearTimeout(nodeTimeout);
        resolve(data);
      },
      (error) => {
        clearTimeout(nodeTimeout);
        reject(error);
      }
    );
  });
};

export const AxiosResponseErrorInterceptor = <T = any, E extends Error = any>(
  errorConstructor: (e: any) => E
): [onFulfilled?: (value: T) => T | Promise<T>, onRejected?: (error: any) => any] => {
  return [
    (response) => response,
    (error) => {
      throw errorConstructor(error);
    },
  ];
};

export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const timestampFromNow = (ms = 0) => {
  return Date.now() + ms;
};
