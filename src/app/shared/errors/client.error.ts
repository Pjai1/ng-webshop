export class ClientError extends Error {
  details: any;
  constructor(public status: number, public statusText: string, error?: any) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, ClientError.prototype);

    if (this.name === undefined || this.name === 'Error') {
      this.name = this.constructor.name;
    }

    this.message = `A client error occurred with status: ${status}`;
    this.details = error;
  }
}
