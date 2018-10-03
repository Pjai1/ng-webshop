interface ErrorConstructor {
  captureStackTrace(thisArg: any, func: any): void;
}

interface Error {
  details: any;
  status: number;
  statusText: string;
}
