export class NoConnectionError extends Error {
  constructor(message: string = 'Internet connection offline or interrupted.') {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, NoConnectionError.prototype);

    if (this.name === undefined || this.name === 'Error') {
      this.name = this.constructor.name;
    }
  }
}
